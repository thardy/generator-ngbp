'use strict';
var util = require('util');
var path = require('path');
var touch = require('touch');
var yeoman = require('yeoman-generator');
var inflector = require('inflected');
var _ = require('lodash');


var ModuleGenerator = yeoman.generators.NamedBase.extend({
    init: function () {
        console.log('Creating the module - ' + this.name);
    },

    askFor: function () {
        var done = this.async();
        var prompts = [];
        // confirm with user if this module is a sub module (dot notation)
        if (this.name.indexOf('.') !== -1) {
            var parent = this.name.substr(0, this.name.lastIndexOf('.'));
            prompts.push({
                name: 'isSubmodule',
                message: 'Looks like ' + this.name + ' is a submodule, do you want to create it in ' + parent + ' module?',
                default: 'y'
            });
        }
        prompts.push({
            name: 'rootFolder',
            message: 'Where do you want to place this module - what is the root folder?',
            default: 'app'
        });

        prompts.push({
            type: 'confirm',
            name: 'includeRest',
            message: "Do you want this module to wrap a REST-ful resource?  (we'll include a service to call an Api, basic controllers, and views)",
            default: false
        });

        this.prompt(prompts, function (props) {
            this.rootFolder = props.rootFolder;
            this.isSubmodule = props.isSubmodule == 'y';
            this.includeRest = props.includeRest;

            done();
        }.bind(this));
    },

    files: function () {
        var modulePath;
        this.projectName = this.config.get('projectName');
        var self = this;
        var capitalModuleName = [];
        // controller name cannot have a dot or dash in it and must be unique in the app
        this.name.split(/[\.-]/).forEach(function (value) {
            capitalModuleName.push(self._.capitalize(value));
        });

        this.capitalModuleName = capitalModuleName.join('');
        this.routeFriendlyName = this.name.replace('.', '-');
        this.camelModuleName = _.camelCase(this.capitalModuleName, false);
        this.resourceInstance = inflector.singularize(this.camelModuleName);
        this.resourceName = this._.capitalize(this.resourceInstance);
        this.kebabModuleName = _.kebabCase(this.name);
        this.singularKebabModuleName = _.kebabCase(inflector.singularize(this.name));

        if (this.isSubmodule) {
            this.lowerModuleName = this.name.toLowerCase().replace('.', '/');
            this.filePrefix = this.name.substr(this.name.lastIndexOf('.') + 1);
            this.path = this.name.replace(/\./g, '/')
            modulePath = path.join('src', this.rootFolder, this.path);

            this.resourceInstance = inflector.singularize(_.camelCase(this._.capitalize(this.filePrefix), false));
            this.resourceName = this._.capitalize(this.resourceInstance);
            this.singularKebabModuleName = _.kebabCase(inflector.singularize(this.filePrefix));

        } else {
            this.lowerModuleName = this.name.toLowerCase();
            this.filePrefix = this.name;
            this.path = this.name;
            modulePath = path.join('src', this.rootFolder, this.name);
        }
        this.mkdir(modulePath);

        if (this.config.get('useCoffeescript')) {
            this.template('_module.module.coffee', path.join(modulePath, this.filePrefix + '.module.coffee'));
            this.template('_module.coffee', path.join(modulePath, this.filePrefix + '.coffee'));
            this.template('_moduleSpec.coffee', path.join(modulePath, this.filePrefix + '.spec.coffee'));

            if (this.includeRest) {
                // if you're reading this, you should probably add the coffee files for the REST implementation
            }
        } else {
            this.template('_module.module.js', path.join(modulePath, this.filePrefix + '.module.js'));
            this.template('_module.js', path.join(modulePath, this.filePrefix + '.js'));
            this.template('_moduleSpec.js', path.join(modulePath, this.filePrefix + '.spec.js'));


            if (this.includeRest) {
                this.template('_moduleAdd.js', path.join(modulePath, 'add' + this.resourceName + '.js'));
                this.template('_moduleAdd.tpl.html', path.join(modulePath, 'add' + this.resourceName + '.tpl.html'));
                this.template('_moduleEdit.js', path.join(modulePath, 'edit' + this.resourceName + '.js'));
                this.template('_moduleEdit.tpl.html', path.join(modulePath, 'edit' + this.resourceName + '.tpl.html'));
                this.template('_moduleService.js', path.join(modulePath, this.resourceInstance + 'Service.js'));

                var directivesDir = path.join(modulePath, 'directives');
                this.mkdir(directivesDir);
                this.template(path.join('directives', '_moduleForm.js'), path.join(directivesDir, this.resourceInstance + 'Form.js'));
                this.template(path.join('directives', '_moduleForm.tpl.html'), path.join(directivesDir, this.resourceInstance + 'Form.tpl.html'));
            }
        }
        this.template('_moduleList.tpl.html', path.join(modulePath, this.filePrefix + '.tpl.html'));
        this.template('_module.less', path.join(modulePath, this.filePrefix + '.less'));

        this._addModuleToAppJs(this.projectName, this.camelModuleName, this.lowerModuleName);

        //        if (this.includeRestfulService) {
        //            // Add RESTful service stuff here
        //        }
    },

    touchIndexHtml: function () {
        // Touch the index.html file to force the index grunt task to rebuild it (that task adds the new module to the scripts)
        var indexHtmlFilePath = 'src/index.html';
        touch(indexHtmlFilePath, {
            mtime: true
        });
    },

    _addModuleToAppJs: function app(projectName, camelModuleName, lowerModuleName) {
        var hook = '])));',
            path = 'src/app/app.js',
            insert = "    '" + projectName + "." + camelModuleName + "',\n";

        if (this.config.get('useCoffeescript')) {
            hook = "'templates-app',";
            path = 'src/app/app.coffee';
            insert = "'" + projectName + "." + camelModuleName + "',\n  ";
        }

        var file = this.readFileAsString(path);

        if (file.indexOf(insert) === -1) {
            this.write(path, file.replace(hook, insert + hook));
        }
    }

});

module.exports = ModuleGenerator;

'use strict';
var util = require('util');
var path = require('path');
var touch = require("touch");
var yeoman = require('yeoman-generator');


var ModuleGenerator = yeoman.generators.NamedBase.extend({
    //    camelModuleName: '',
    //    capitalModuleName: '',
    //    lowerModuleName: '',
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
        //            {
        //                type: 'confirm',
        //                name: 'includeRest',
        //                message: 'Do you want to include a REST-ful service, with basic controllers, and views?',
        //                default: false
        //            },

        this.prompt(prompts, function (props) {
            this.rootFolder = props.rootFolder;
            this.isSubmodule = props.isSubmodule == 'y';
            //            this.includeRest = props.includeRest;

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

        if (this.isSubmodule) {
            this.camelModuleName = this.name;
            var capitalModuleName = [];
            this.lowerModuleName = this.name.toLowerCase().replace('.', '/');
            this.filePrefix = this.camelModuleName.substr(this.camelModuleName.lastIndexOf('.') + 1);
            this.path = this.camelModuleName.replace(/\./g, '/')
            modulePath = path.join('src', this.rootFolder, this.path);

        } else {
            this.camelModuleName = this.name;
            this.lowerModuleName = this.name.toLowerCase();
            this.filePrefix = this.camelModuleName;
            this.path = this.camelModuleName;
            modulePath = path.join('src', this.rootFolder, this.camelModuleName);
        }
        this.mkdir(modulePath);

        if (this.config.get('useCoffeescript')) {
            this.template('_module.module.coffee', path.join(modulePath, this.filePrefix + '.module.coffee'));
            this.template('_module.coffee', path.join(modulePath, this.filePrefix + '.coffee'));
            this.template('_moduleSpec.coffee', path.join(modulePath, this.filePrefix + '.spec.coffee'));
        } else {
            this.template('_module.module.js', path.join(modulePath, this.filePrefix + '.module.js'));
            this.template('_module.js', path.join(modulePath, this.filePrefix + '.js'));
            this.template('_moduleSpec.js', path.join(modulePath, this.filePrefix + '.spec.js'));
        }
        this.template('_moduleHtml.tpl.html', path.join(modulePath, this.filePrefix + '.tpl.html'));
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

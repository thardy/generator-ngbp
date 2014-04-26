'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var NgbpGenerator = yeoman.generators.Base.extend({
    init: function () {
        this.pkg = require('../package.json');

        this.on('end', function () {
            if (!this.options['skip-install']) {
                this.installDependencies({
                    callback: function () {
                        // Emit a new event - dependencies installed
                        this.emit('dependenciesInstalled');
                    }.bind(this)
                });
            }
        });

        // Now we can bind to the dependencies installed event
        this.on('dependenciesInstalled', function() {
            //this.spawnCommand('grunt', ['build']);
            this.log(chalk.green(
                '\nYou\'re good to go!!!!\n' +
                'Simply running ') + chalk.cyan.bold("grunt watch") + chalk.green(' will do the following:\n' +
                ' - Build everything (concat, create js templates of html, etc) and place it into a "build" folder\n' +
                ' - Run all your tests\n' +
                ' - Watch your files for changes to do the above without any intervention\n' +
                ' - Launch express server to host your app at http://localhost:9000/index.html\n' +
                ' - Setup LiveReload so you immediately see changes in your browser (you still have to enable LiveReload on your browser)\n'));
        });
    },

    askFor: function () {
        var done = this.async();

        // have Yeoman greet the user
        this.log(this.yeoman);

        this.log(chalk.magenta('You\'re using the ngbp (AngularBoilerplate) generator, a best-practice boilerplate\n for any scale Angular project built on a highly modular, folder-by-feature structure.'));

        var prompts = [
            {
                name: 'projectName',
                message: 'What do you want to name your project?\n e.g. angular.module(\'exactlyWhatYouTypeBelow\', [])\n ?',
                default: 'myProject'
            },
            {
                name: 'author',
                message: 'What is the author or company name?\n Used for copyright\'s in html, banners in code, and author prop in package.json\n ?',
                default: 'Somebody Special'
            },
            {
                type: 'confirm',
                name: 'useCoffeescript',
                message: 'Would you like to use Coffeescript?',
                default: false
            },
            {
                type: 'confirm',
                name: 'includeAngularResource',
                message: 'Do you want to include angular-resource, helpful for calling RESTful apis?',
                default: true
            },
        ];

        this.prompt(prompts, function (props) {
            this.projectName = props.projectName;
            this.author = props.author;
            this.useCoffeescript = props.useCoffeescript;
            this.includeAngularResource = props.includeAngularResource;

            done();
        }.bind(this));
    },

    config: function() {
        this.config.set('projectName', this.projectName);
        this.config.set('useCoffeescript', this.useCoffeescript);
        this.config.save();
    },

    _processDirectory: function (source, destination) {
        var root = this.isPathAbsolute(source) ? source : path.join(this.sourceRoot(), source);
        var files = this.expandFiles('**', { dot: true, cwd: root });
        var useCoffeescript = this.config.get('useCoffeescript');

        for (var i = 0; i < files.length; i++) {
            var f = files[i];
            var fExt = f.split('.').pop().toLowerCase();
            var fIsSource = path.dirname(f).split('/').shift() == 'src';
            var isExcluded = false;
            if (fIsSource) {
                if ((useCoffeescript && fExt == 'js') || (!useCoffeescript && fExt == 'coffee')) {isExcluded = true;}
            }
            var src = path.join(root, f);
            if (!isExcluded) {
                if (path.basename(f).indexOf('_') == 0) {
                    var dest = path.join(destination, path.dirname(f), path.basename(f).replace(/^_/, ''));
                    this.template(src, dest);
                }
                else {
                    var dest = path.join(destination, f);
                    this.copy(src, dest);
                }
            }
        }
    },

    app: function () {
        this._processDirectory('root', '');
//        this.mkdir('app');
//        this.mkdir('app/templates');
//
//        this.copy('_package.json', 'package.json');
//        this.copy('_bower.json', 'bower.json');
    }

});

module.exports = NgbpGenerator;
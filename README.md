# generator-ngbp

> Yeoman Generator based on the popular ngBoilerplate AngularJS kickstarter.  ngBoilerplate is a best-practice boilerplate for scalable Angular projects built on a highly modular, folder-by-feature structure.  You work in vertical slices on a daily basis (view, controller, service, etc), so why not organize your projects to optimize your workflow, maximize discoverability, and get copy-paste module reuse for free?

## Latest Updates
(12/29/14) Many best-practice improvements, including use of "Controller as model" syntax, cleaner controllers, plus separate \*.module.js file for module declarations and
grunt build support for those files.
Coffeescript is close but broken with the *.module.coffee being included twice in resultant js file.  I could use some help from anyone who works
in coffeescript regularly, especially coffeescript grunt builds. As always, let me know if you find anything that needs fixing.

## Quick Start

Install generator-ngbp from npm, run:

```
$ npm install -g generator-ngbp
```

Create a new directory for your project and cd into it:

```
$ mkdir my-new-project
$ cd my-new-project
```

Initiate the generator:

```
$ yo ngbp
```

### Sub-Generators

There's only one subgenerator at the moment
    ngbp:module

To create a new module...

```
$ yo ngbp:module "moduleName"
```

You can specify the root folder of the module via prompt - default is "app".

If you specify module name with a dot (e.g. account.profile), you will be prompted to confirm that you want to create a sub module. Choosing y (default), a new 'profile' module will be created in account folder.

You have to authorize the overwrite of app.js when the subgenerator adds a dependency for your new module (the default is Y, so you can just hit enter at the prompt).
There's also still a bug with grunt watch that doesn't always see new files in new folders - https://github.com/gruntjs/grunt-contrib-watch/issues/70. Stopping and
re-running grunt watch will always work though.

### ngBoilerplate Tips

When adding bower modules, always install with
```
$ bower install some-bower-module --save-dev
```
Then manually edit the vendor_files.js variable in Gruntfile.js to add the full path to the js files you need from the vendor folder.
This grunt variable is what is used to create the script tags in the header of your index.html in the build folder (dev site).
When you run "grunt compile", this same variable is used to add the vendor files to the single, minified js file in the bin folder (prod site).

### More Info

To learn more about ngBoilerplate, [click here](https://github.com/ngbp/ngbp)



## License

MIT

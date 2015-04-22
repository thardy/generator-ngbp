# generator-ngbp

> Yeoman Generator based on the popular ngBoilerplate AngularJS kickstarter.  ngBoilerplate is a best-practice boilerplate for scalable Angular projects built on a highly modular, folder-by-feature structure.  You work in vertical slices on a daily basis (view, controller, service, etc), so why not organize your projects to optimize your workflow, maximize discoverability, and get copy-paste module reuse for free?

## Latest Updates
(4/22/15) Added some pretty hefty improvements - easily switchable mocking with $httpBackend and scaffolding of RESTful resources.  See below. Also updated to Angular 1.3.15 and hardcoded the bower version to avoid issues.  As always, please let me know of any issues.

(12/29/14) Many best-practice improvements, including use of "Controller as model" syntax, cleaner controllers, plus separate \*.module.js file for module declarations and
grunt build support for those files.
Coffeescript is close but broken with the *.module.coffee being included twice in resultant js file.  I could use some help from anyone who works
in coffeescript regularly, especially coffeescript grunt builds. 

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
### Mocking
You can now switch in and out of mocking mode by simply running ```grunt watchmock``` vs ```grunt watch```.  Switching between the two will handle all the necessary configuration within your SPA. Running in mock mode will use $httpBackend to intercept any external http calls you manually configure and return whatever results you want.

See mockApp.js for a full CRUD example, and combine with the new RESTful module generator for a full, working, end-to-end example - great for prototyping data-driven UX with fully functional controllers and api-calling angular services without having to actually build the api first.  Simply switch back to ```grunt watch``` and your code will now be making real external calls to a real (if it exists) api.  This is my preferred mocking implementation because your code is written to actually make the http call, and the interception is handled by angular.  When you are ready to hit a real api, you have no code changes to make.

### Sub-Generators

There's only one subgenerator at the moment
    ngbp:module

To create a new module...

```
$ yo ngbp:module "moduleName"
```

You can specify the root folder of the module via prompt - default is "app".

If you specify a module name with a dot (e.g. account.profile), you will be prompted to confirm that you want to create a sub module. Choosing y (default), a new 'profile' module will be created in account folder.

You will be prompted whether you want your module to wrap a RESTful resource.  The default is no.

You have to authorize the overwrite of app.js when the subgenerator adds a dependency for your new module (the default is Y, so you can just hit enter at the prompt).

##### RESTful Scaffolding
If you choose yes to wrap a RESTful resource, you will get fully scaffolded RESTful controllers, views, and a service for CRUD support, using ngResource under the covers - so don't forget to answer 'y' when asked if you want angular-resource when you generate your app, or just add it yourself.  The naming convention is currently setup to handle straightforward pluralized module names, like "products", and the scaffolding assumes an api hanging off whatever domain your spa is running on (e.g. http://mydomain.com/api/products).  Try the following...
```
yo ngbp:module "products"
```
...type ```y``` when asked if you want to wrap a RESTful resource, then switch your ```grunt watch``` over to ```grunt watchmock``` to see a fully-working example.  Navigate to http://localhost:9000/#/products to view (there's no navigation scaffolding at this point, but the routing is there).  The mocked results for "products" are handled in a heavily-commented mockApp.js, which you can edit to mock whatever you want.

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

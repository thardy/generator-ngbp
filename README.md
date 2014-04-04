# generator-ngbp

> Yeoman Generator based on the popular ngBoilerplate AngularJS kickstarter.  ngBoilerplate is a best-practice boilerplate for any scale Angular project built on a highly modular, folder-by-feature structure.  You work in vertical slices on a daily basis (view, controller, service, etc), so why not organize your projects to optimize your workflow, maximize discoverability, and get copy-paste module reuse for free?


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

Finally, initiate the generator:

```
$ yo ngbp
```

### Sub-Generators

There's only one subgenerator at the moment
    - ngbp:module

To create a new module...

```
$ yo ngbp:module "moduleName"
```

The module generator doesn't currently add your new module to the main app.js file's dependency list, which you will need to do.  Hopefully, this will be added soon.

### More Info

To learn more about ngBoilerplate, [click here](https://github.com/ngbp/ngbp)



## License

MIT

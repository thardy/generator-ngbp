(function(app) {

    app.config(function ($stateProvider) {
        $stateProvider.state('<%= camelModuleName %>', {
            url: '/<%= lowerModuleName %>',
            views: {
                "main": {
                    controller: '<%= capitalModuleName %>Controller',
                    templateUrl: '<%= lowerModuleName %>/<%= lowerModuleName %>.tpl.html'
                }
            },
            data:{ pageTitle: '<%= capitalModuleName %>' }
        });
    });

    app.controller('<%= capitalModuleName %>Controller', function ($scope) {

        var init = function() {
        };

        init();
    });

// The name of the module, followed by its dependencies (at the bottom to facilitate enclosure)
}(angular.module("<%= projectName %>.<%= camelModuleName %>", [
        'ui.router'
    ])));
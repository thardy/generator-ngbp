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

}(angular.module("<%= projectName %>.<%= camelModuleName %>", [
    'ui.router'
])));
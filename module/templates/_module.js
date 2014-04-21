(function(app) {

    app.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('<%= name %>', {
            url: '/<%= lowerModuleName %>',
            views: {
                "main": {
                    controller: '<%= capitalModuleName %>Controller',
                    templateUrl: '<%= name %>/<%= name %>.tpl.html'
                }
            },
            data:{ pageTitle: '<%= capitalModuleName %>' }
        });
    }]);

    app.controller('<%= capitalModuleName %>Controller', ['$scope', function ($scope) {

        var init = function() {
        };

        init();
    }]);

}(angular.module("<%= projectName %>.<%= camelModuleName %>", [
    'ui.router'
])));
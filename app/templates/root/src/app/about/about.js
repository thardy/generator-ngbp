(function(app) {

    app.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('about', {
            url: '/about',
            views: {
                "main": {
                    controller: 'AboutController',
                    templateUrl: 'about/about.tpl.html'
                }
            },
            data:{ pageTitle: 'About' }
        });
    }]);

    app.controller('AboutController', ['$scope', function ($scope) {

        var init = function() {
            // A definitive place to put everything that needs to run when the controller starts. Avoid
            //  writing any code outside of this function that executes immediately.
        };

        init();
    }]);

}(angular.module("<%= projectName %>.about", [
    'ui.router'
])));
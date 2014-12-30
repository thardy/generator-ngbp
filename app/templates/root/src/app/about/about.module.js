(function(module) {

    module.config(function ($stateProvider) {
        $stateProvider.state('about', {
            url: '/about',
            views: {
                "main": {
                    controller: 'AboutController as model',
                    templateUrl: 'about/about.tpl.html'
                }
            },
            data:{ pageTitle: 'About' }
        });
    });

}(angular.module("<%= projectName %>.about", [
    'ui.router'
])));

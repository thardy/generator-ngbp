(function (module) {

    module.config(function ($stateProvider) {
        $stateProvider.state('<%= name %>', {
            url: '/<%= lowerModuleName %>',
            views: {
                "main": {
                    controller: '<%= capitalModuleName %>Controller as model',
                    templateUrl: '<%= path %>/<%= filePrefix %>.tpl.html'
                }
            },
            data: {
                pageTitle: '<%= capitalModuleName %>'
            }
        });
    });

}(angular.module("<%= projectName %>.<%= camelModuleName %>", [
    'ui.router'
])));
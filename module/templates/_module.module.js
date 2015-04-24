(function(module) {

    <% if (includeRest) { %>
    module.config(function ($stateProvider) {
        $stateProvider
            .state('<%= routeFriendlyName %>', {
                url: '/<%= kebabModuleName %>',
                views: {
                    'main@': {
                        controller: '<%= capitalModuleName %>Controller as model',
                        templateUrl: '<%= path %>/<%= kebabModuleName %>.tpl.html'
                    }
                },
                data:{ pageTitle: '<%= capitalModuleName %>' }
            })
            .state('add<%= resourceName %>', {
                url: '/<%= path %>/add-<%= singularKebabModuleName %>',
                views: {
                    'main@': {
                        controller: 'Add<%= resourceName %>Controller as model',
                        templateUrl: '<%= path %>/add<%= resourceName %>.tpl.html'
                    }
                },
                data:{ pageTitle: 'Add <%= resourceName %>' }
            })
            .state('edit<%= resourceName %>', {
                url: '/<%= path %>/edit-<%= singularKebabModuleName %>/{id}',
                views: {
                    'main@': {
                        controller: 'Edit<%= resourceName %>Controller as model',
                        templateUrl: '<%= path %>/edit<%= resourceName %>.tpl.html'
                    }
                },
                data:{ pageTitle: 'Edit <%= resourceName %>' }
            });
    });
    <% } else { %>
    module.config(function ($stateProvider) {
        $stateProvider.state('<%= routeFriendlyName %>', {
            url: '/<%= kebabModuleName %>',
            views: {
                "main": {
                    controller: '<%= capitalModuleName %>Controller as model',
                    templateUrl: '<%= path %>/<%= kebabModuleName %>.tpl.html'
                }
            },
            data:{ pageTitle: '<%= capitalModuleName %>' }
        });
    });
    <% } %>

}(angular.module('<%= projectName %>.<%= camelModuleName %>', [
    'ui.router'<% if (includeRest) { %>,
    'ngResource'<% } %>
])));

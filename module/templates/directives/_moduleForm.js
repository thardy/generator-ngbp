(function(module) {
    module.directive('<%= resourceInstance %>Form', function() {
        var linker = function(scope, element, attrs) {
            // do DOM Manipulation here
        };
        return {
            restrict: 'A',
            templateUrl: '<%= lowerModuleName %>/directives/<%= resourceInstance %>Form.tpl.html',
            link: linker,
            controller: '<%= resourceName %>FormController as model',
            bindToController: true,
            scope: {
                <%= resourceInstance %>: '=<%= resourceInstance %>Form',
                lookups: '=<%= resourceInstance %>Lookups'
            }
        };
    });

    module.controller('<%= resourceName %>FormController', function() {
        var model = this;

    });
})(angular.module('<%= projectName %>.<%= camelModuleName %>'));
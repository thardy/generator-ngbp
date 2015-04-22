(function(module) {

    module.controller('<%= capitalModuleName %>Controller', function (<%= resourceName %>) {
        var model = this;
        model.loading = false;
        model.<%= lowerModuleName %> = [];

        init();

        function init() {
            model.<%= lowerModuleName %> = get<%= capitalModuleName %>();
        }

        function get<%= capitalModuleName %>() {
            model.loading = true;
            <%= resourceName %>.query().$promise.then(function(response) {
                model.<%= lowerModuleName %> = response;
                model.loading = false;
            });
        }
    });

}(angular.module("<%= projectName %>.<%= camelModuleName %>")));
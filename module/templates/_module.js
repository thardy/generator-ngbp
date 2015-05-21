(function(module) {
    <% if (includeRest) { %>
    module.controller('<%= capitalModuleName %>Controller', function (<%= resourceName %>) {
        var model = this;
        model.loading = false;
        model.<%= camelModuleName %> = [];

        init();

        function init() {
            model.<%= camelModuleName %> = get<%= capitalModuleName %>();
        }

        function get<%= capitalModuleName %>() {
            model.loading = true;
            <%= resourceName %>.query().$promise.then(function(response) {
                model.<%= camelModuleName %> = response;
                model.loading = false;
            });
        }
    });
    <% } else { %>
    module.controller('<%= capitalModuleName %>Controller', function () {
        var model = this;

        init();

        function init() {

        }
    });
    <% } %>
}(angular.module("<%= projectName %>.<%= camelModuleName %>")));
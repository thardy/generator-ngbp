(function(module) {
    <% if (includeRest) { %>
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
    <% } else { %>
    module.controller('<%= capitalModuleName %>Controller', function () {
        var model = this;

        init();

        function init() {

        }
    });
    <% } %>
}(angular.module("<%= projectName %>.<%= camelModuleName %>")));
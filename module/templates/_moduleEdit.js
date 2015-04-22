(function(module) {

    module.controller('Edit<%= resourceName %>Controller', function ($state, $window, <%= resourceName %>) {
        var model = this;
        model.<%= resourceInstance %> = {};
        model.loading = false;
        model.update = update;

        init();

        function init() {
            model.<%= resourceInstance %> = get<%= resourceName %>();
        }

        function get<%= resourceName %>() {
            model.loading = true;
            <%= resourceName %>.get({ id: $state.params.id }).$promise
                .then(function(response) {
                    model.<%= resourceInstance %> = response;
                    model.loading = false;
                });
        }

        function update() {
            model.<%= resourceInstance %>.$update()
                .then(function(response) {
                    $window.location = '#/<%= lowerModuleName %>';
                });
        }
    });

}(angular.module("<%= projectName %>.<%= camelModuleName %>")));

(function(module) {

    module.controller('Add<%= resourceName %>Controller', function ($window, <%= resourceName %>) {
        var model = this;
        model.<%= resourceInstance %> = new <%= resourceName %>();
        model.save = save;

        init();

        function init() {

        }

        function save() {
            model.<%= resourceInstance %>.$save()
                .then(function (data) {
                    $window.location = '#/<%= lowerModuleName %>';
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally();
        }
    });

}(angular.module("<%= projectName %>.<%= camelModuleName %>")));

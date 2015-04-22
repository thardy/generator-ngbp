(function(module) {
    module.factory('<%= resourceName %>', function($resource) {
        return $resource(
            '/api/<%= lowerModuleName %>/:id',
            { id: '@id' },
            { 'update': {method: 'PUT'} }
        );
    });
})(angular.module("<%= projectName %>.<%= camelModuleName %>"));

do (app=angular.module "<%= projectName %>", [
  '<%= projectName %>.home',
  '<%= projectName %>.about',
  'templates-app',
  'templates-common',
  'ui.router.state',
  'ui.router',
]) ->

  app.config ($stateProvider, $urlRouterProvider) ->
    $urlRouterProvider.otherwise '/home'

  app.run ->

  app.controller 'AppController', ($scope) ->




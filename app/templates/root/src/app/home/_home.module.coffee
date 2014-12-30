do (module=angular.module "<%= projectName %>.home", [
  'ui.router'
]) ->
  module.config ($stateProvider) ->
    $stateProvider.state 'home',
      url: '/home'
      views:
        "main":
          controller: 'HomeController as model'
          templateUrl: 'home/home.tpl.html'
      data:
        pageTitle: 'Home'



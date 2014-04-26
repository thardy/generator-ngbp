do (app=angular.module "<%= projectName %>.<%= camelModuleName %>", [
  'ui.router'
]) ->
  app.config ['$stateProvider', ($stateProvider) ->
    $stateProvider.state '<%= name %>',
      url: '/<%= lowerModuleName %>'
      views:
        "main":
          controller: '<%= capitalModuleName %>Controller'
          templateUrl: '<%= name %>/<%= name %>.tpl.html'
      data:
        pageTitle: '<%= name %>/<%= name %>.tpl.html'
  ]

  app.controller '<%= capitalModuleName %>Controller', ['$scope', ($scope) ->
    init = ->
      # Initialize

    init()
  ]

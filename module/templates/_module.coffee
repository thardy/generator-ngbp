do (module=angular.module "<%= projectName %>.<%= camelModuleName %>") ->
  module.controller '<%= capitalModuleName %>Controller', () ->
    model = this

    init = ->
      # Initialize

    init()


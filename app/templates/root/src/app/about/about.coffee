do (module=angular.module "<%= projectName %>.about") ->
  module.controller 'AboutController', () ->
    model = this

    init = ->
      # A definitive place to put everything that needs to run
      # when the controller starts. Avoid writing any code outside
      # of this function that executes immediately.

    init()


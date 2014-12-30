###
# Each section of the site has its own module. It probably also has
# submodules, though this boilerplate is too simple to demonstrate it. Within
# 'src/app/home', however, could exist several additional folders representing
# additional modules that would then be listed as dependencies of this one.
# For example, a 'note' section could have the submodules 'note.create',
# 'note.delete', 'note.edit', etc.
#
# Regardless, so long as dependencies are managed correctly, the build process
# will automatically take take of the rest.
###
do (module=angular.module "<%= projectName %>.home") ->
  # As you add controllers to a module and they grow in size, feel free to
  # place them in their own files. Let each module grow organically, adding
  # appropriate organization and sub-folders as needed.
  module.controller 'HomeController', () ->
    model = this
    model.someVar = 'blue'
    model.someList = ['one', 'two', 'three']
    model.someFunctionUsedByTheHomePage = ->
      alert('Congratulations')

    init = ->
      # A definitive place to put everything that needs to run when the
      # controller starts. Avoid writing any code outside of this function
      # that executes immediately.

    init()





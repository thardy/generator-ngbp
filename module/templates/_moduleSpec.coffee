describe '<%= camelModuleName %> section', ->
  beforeEach(module '<%= projectName %>.<%= camelModuleName %>')

  it('should have a dummy test', inject ->
    expect(true).toBeTruthy()
  )

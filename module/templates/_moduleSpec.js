describe('<%= camelModuleName %> section', function () {
    beforeEach(module('<%= projectName %>.<%= camelModuleName %>'));

    it('should have a dummy test', inject(function() {
        expect(true).toBeTruthy();
    }));
});
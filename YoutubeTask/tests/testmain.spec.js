describe('Search Youtube', function () {
   
    it('get youtube results', function (done) {
        var promise = myApp.service.search('you');
        promise.then(function (data) {
            done();
            expect(data.items.length).toEqual(15);
        });
    });

  
});
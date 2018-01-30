describe('Verify search service execution', function () {
    var service;
    beforeEach(function(){
        service = myApp.service;
        spyOn(service, 'search');
    });
     it('call serach service', function () {
        service.search('you');        
         expect(service.search).toHaveBeenCalledWith('you');
     });
    
 });

describe('Testing spies', function () {
    it('Should spy on serach service response', function () {
            spyOn(myApp.service, 'search').and.callFake(function () {
            return "Hello";
        });
        var response = myApp.service.search('you');
        expect(response).toEqual("Hello");
    });

});

describe('Search Youtube', function () {
   
    it('get youtube results', function (done) {
        var promise = myApp.service.search('you');
        promise.then(function (data) {
            done();
            expect(data.items.length).toEqual(15);
        });
    });

  
});

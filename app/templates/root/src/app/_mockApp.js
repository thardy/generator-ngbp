(function(module) {
    module.run(function($httpBackend, $filter, $location) {

        // Intercept only the calls we want to mock

        // EXAMPLE CRUD INTERCEPTION OF A RESOURCE NAMED "Products".
        // Feel free to refactor this out into other files, but heed the following advice...
        //   I wouldn't build automated tests on this or even try to maintain this for all features going forward because
        // it can become a nightmare.  Once you get a feature working, I recommend simply re-purposing/overwriting this
        // code for the next feature.  I've come to believe it's best used for rapid prototyping one feature at a time,
        // not for maintaining for all features.

        // *** Products *****************************************************************************************
        // I use objects because writing json in javascript is a pain and converting via $filter is easy.
        // This array will act as our fake database.
        var products = [
            { id: 1, name: 'Doohicky', description: 'It is what it is.' },
            { id: 2, name: 'Thingamajig', description: 'One of those things...' },
            { id: 3, name: 'Widget', description: 'A smaller version of the thingamajig.' }
        ];

        var indentSpacing = 2;

        // Products GET with id - these tend to be greedy so the more specific GET with parm HAS to be listed
        //  before the generic GET all or the GET all will suck up the GET with parm requests.
        $httpBackend.whenGET(/api\/products\/[\d]+/).respond(function(method, url, data) {
                var path = $location.path(); // returns something like "/products/edit-product/1", so the id will be after the third slash
                var pathArray = path.split('/');
                var productId = pathArray[3];
                return [200, $filter('json')(getById(products, productId), indentSpacing), { 'Cache-control': 'no-cache' }];
            });

        // Products GET all
        $httpBackend.whenGET(/api\/products/).respond(function(method, url, data) {
            return [200, $filter('json')(products, indentSpacing), { 'Cache-control': 'no-cache' }];
        });

        // Products POST
        $httpBackend.whenPOST(/api\/products/).respond(function(method, url, data) {
            // Add to our products array, which is acting like a fake database
            var newProduct = angular.fromJson(data);
            newProduct.id = products.push(newProduct);  // data should be the json product that was posted to us,
                                                        //  and the new length of products should make a fine fake Id
            return [200, newProduct, {}]; // respond expects us to return array containing status, data, headers
        });

        // Products PUT
        $httpBackend.whenPUT(/api\/products\/[\d]+/).respond(function(method, url, data) {
            // Update our products array, which is acting like a fake database
            var updatedProduct = angular.fromJson(data);
            var index = products.indexOf(getById(products, updatedProduct.id));
            products[index] = updatedProduct;
            return [201, updatedProduct, {}]; // respond expects us to return array containing status, data, headers
        });
        // ***************************************************************************************************


        // Now let everything else, everything not specified above, pass through to their real http calls
        $httpBackend.whenGET(/.+/).passThrough();
        $httpBackend.whenPOST(/.+/).passThrough();
        $httpBackend.whenPUT(/.+/).passThrough();


        // Helper functions
        function getById(array, id) {
            var len = array.length;
            for (i = 0; i < len; i++) {
                    if (+array[i].id == +id) {
                            return array[i];
                        }
                }
            return null;
        }
    });
})(angular.module('mockApp', ['<%=projectName%>', 'ngMockE2E']));

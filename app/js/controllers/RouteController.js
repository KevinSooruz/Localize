app.config(["$routeProvider", function($routeProvider){
        
    $routeProvider.when("/", {
        
        templateUrl: "app/views/home.php",
        controller: "HomeController"
        
    }).when("/addresses", {
        
        templateUrl: "app/views/adresses.php",
        controller: "AddressesController",
        resolve:{
            session: app.session // Vérification si session active pour accéder au compte client
        }
        
    }).when("/addresses/lists/:nameList", {
        
        templateUrl: "app/views/lists.php",
        controller: "ListsController",
        resolve:{
            session: app.session // Vérification si session active pour accéder au compte client
        }
        
    }).when("/addresses/categories/All", {
        
        templateUrl: "app/views/categories.php",
        controller: "CategoriesController",
        resolve:{
            session: app.session // Vérification si session active pour accéder au compte client
        }
        
    }).when("/addresses/categories/:nameCategorie", {
        
        templateUrl: "app/views/categories.php",
        controller: "CategoriesController",
        resolve:{
            session: app.session // Vérification si session active pour accéder au compte client
        }
        
    }).when("/addresses/categories/:nameCategorie/:nameAddress", {
        
        templateUrl: "app/views/address.php",
        controller: "AddressController",
        resolve:{
            session: app.session // Vérification si session active pour accéder au compte client
        }
        
    }).when("/map", {
        
        templateUrl: "app/views/map.php",
        controller: "mapController",
        resolve: {
            session: app.session // Vérification si session active pour accéder au compte client
        }
        
    }).when("/map/categories/:nameCategorie", {
        
        templateUrl: "app/views/map.php",
        controller: "mapController",
        resolve: {
            session: app.session // Vérification si session active pour accéder au compte client
        }
        
    }).when("/map/lists/:nameList", {
        
        templateUrl: "app/views/map.php",
        controller: "mapController",
        resolve: {
            session: app.session // Vérification si session active pour accéder au compte client
        }
        
    }).when("/map/categories/:nameCategorie/:nameAddress", {
        
        templateUrl: "app/views/map.php",
        controller: "mapController",
        resolve: {
            session: app.session // Vérification si session active pour accéder au compte client
        }
        
    }).when("/map/search/:cityCode", {
        
        templateUrl: "app/views/map.php",
        controller: "mapController",
        resolve: {
            session: app.session // Vérification si session active pour accéder au compte client
        }
        
    }).when("/map/search/:cityCode/:typeName", {
        
        templateUrl: "app/views/map.php",
        controller: "mapController",
        resolve: {
            session: app.session // Vérification si session active pour accéder au compte client
        }
        
    }).otherwise({
        
        redirectTo: "/"
        
    });
    
}]);
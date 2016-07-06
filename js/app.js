var app = angular.module("myApp", [
    "ngRoute"
]);

app.config(function ($routeProvider) { 
    $routeProvider 

        .when('/', { 
            controller: 'ProductionControlController', 
            templateUrl: 'js/components/production-control/index.html' 
        })      

        .otherwise({ 
            redirectTo: '/' 
        }); 
});





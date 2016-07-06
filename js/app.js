var app = angular.module("myApp", [
    "ngRoute"
]);

app.config(function ($routeProvider) { 
    $routeProvider 

        .when('/', { 
            controller: 'ProductionControlController', 
            templateUrl: 'js/components/production-control/index.html' 
        })   
        .when('/synoptic', { 
            controller: 'SynopticController', 
            templateUrl: 'js/components/synoptic/index.html' 
        })      
        .when('/incidents', { 
            controller: 'IncidentsController', 
            templateUrl: 'js/components/incidents/index.html' 
        })      

        .otherwise({ 
            redirectTo: '/' 
        }); 
});





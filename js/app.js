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

app.run(function($rootScope, $http) {

    // load settings
    $http({
        method  : 'GET',
        url     : 'js/settings.json'
     })
    .success(function(data) {
        $rootScope.settings = data;
    });



    $rootScope.intervals = [];

    $rootScope.setInterval = function(callback) {
        $rootScope.intervals.push(setInterval(callback, $rootScope.settings.dataRefreshTime));
    };

    $rootScope.clearIntervals = function() {
        for (i in $rootScope.intervals) {
            clearInterval($rootScope.intervals[i]);
        }
        $rootScope.intervals = [];
    };
});
    




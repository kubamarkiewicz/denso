var app = angular.module("myApp", [
    "ngRoute",
    'ArtisterilIntervalService'
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
        .when('/tags', { 
            controller: 'TagsController', 
            templateUrl: 'js/components/tags/index.html' 
        })      

        .otherwise({ 
            redirectTo: '/' 
        }); 
});
app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);


app.run(function($rootScope, $http, $location) {

    // load settings
    $http({
        method  : 'GET',
        url     : 'js/settings.json'
     })
    .success(function(data) {
        $rootScope.settings = data;
    });


    // when URL changes
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {

        // set css classes on nav
        $("header nav a").removeClass("selected");
        switch($location.path()) {
            case '/':
                $("header nav .production-control").addClass("selected");
                break;
            case '/incidents':
                $("header nav .incidents").addClass("selected");
                break;
            case '/synoptic':
                $("header nav .synoptic").addClass("selected");
                break;
        } 
        $('h1.page-title').html($('header nav .selected').html());

    });

});
    




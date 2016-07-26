app.controller('ProductionControlController', ['$scope', '$rootScope', '$http', 'ArtisterilIntervalService', function($scope, $rootScope, $http, ArtisterilIntervalService) { 

	$("header nav").attr("class", "production-control");

    $scope.ordersData = [];
    $scope.destinationsData = [];
    
    ArtisterilIntervalService.clearIntervals();

    $scope.loadOrdersData = function()
    {
        $http({
            method  : 'GET',
            url     : $rootScope.settings.webServiceURLs.getOrders
         })
        .success(function(data) {
            if (data) {
                $scope.ordersData = data.Get_OrdersResult;
            }
        });
    }
    $scope.loadOrdersData();
    ArtisterilIntervalService.setInterval(function(){
        if ($('.production-control select:focus').length==0) {
            $scope.loadOrdersData();
        };
    });



    $scope.loadDestinationsData = function()
    {
        $http({
            method  : 'GET',
            url     : $rootScope.settings.webServiceURLs.getDestinations
         })
        .success(function(data) {
            if (data) {
                $scope.destinationsData = data.Get_Order_DestinationsResult;
            }
        });
    }
    $scope.loadDestinationsData();


    $scope.setOrder = function(item)
    {
        $http({
            method  : 'GET',
            url     : $rootScope.settings.webServiceURLs.setOrder,
            params  : {Time: item.Time, IdDestination: item.IdDestination}
         })
        .success(function(data) {
            $scope.loadOrdersData();
        });
    }


}]);
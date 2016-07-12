app.controller('ProductionControlController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) { 

	$("header nav").attr("class", "production-control");

    $scope.ordersData = {};
    $scope.destinationsData = {};
    
    $rootScope.clearIntervals();


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
            console.log($scope.ordersData);
        });
    }
    $scope.loadOrdersData();
    $rootScope.setInterval(function(){
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
            params  : {Time: item.Time, IdDestination: item.Id}
         })
        .success(function(data) {
            $scope.loadOrdersData();
        });
    }


}]);
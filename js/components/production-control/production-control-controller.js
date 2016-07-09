app.controller('ProductionControlController', ['$scope', '$http', function($scope, $http) { 

	$("header nav").attr("class", "production-control");

    var apiUrl  = 'web-service/Get_Orders.json';
    var apiUrl2 = 'web-service/Set_Order.json';
	var apiUrl3 = 'web-service/Get_Destinations.json';

    $scope.ordersData = {};
    $scope.destinationsData = {};

    $scope.loadOrdersData = function()
    {
        $http({
            method  : 'GET',
            url     : apiUrl
         })
        .success(function(data) {
            if (data) {
                $scope.ordersData = data.Get_OrdersResult;
            }
        });
    }
    $scope.loadOrdersData();
    setInterval(function(){ 
        $scope.loadOrdersData();
    }, 1000);


    $scope.loadDestinationsData = function()
    {
        $http({
            method  : 'GET',
            url     : apiUrl3
         })
        .success(function(data) {
            if (data) {
                $scope.destinationsData = data.Get_DestinationsResult;
            }
        });
    }
    $scope.loadDestinationsData();


    $scope.setOrder = function(item)
    {
        $http({
            method  : 'GET',
            url     : apiUrl2,
            params  : {Time: item.Time, IdDestination: item.IdDestination}
         })
        .success(function(data) {
            $scope.loadOrdersData();
        });
    }


}]);
app.controller('IncidentsController', ['$scope', '$http', function($scope, $http) {  

	$("header nav").attr("class", "incidents");

	var apiUrl = 'api/Get_IncidencesResult.json';

    $scope.data = {};

    $scope.loadData = function()
    {
        $http({
            method  : 'GET',
            url     : apiUrl
         })
        .success(function(data) {
        	// parse date: var date = new Date(parseInt(jsonDate.substr(6)));
        	// console.log(data);
            if (data) {
                $scope.data = data.Get_IncidencesResult;
            }
        });
    }

    $scope.loadData();

}]);
app.controller('IncidentsController', ['$scope', '$http', function($scope, $http) {  

	$("header nav").attr("class", "incidents");

	var apiUrl = 'web-service/Get_IncidencesResult.json';

    $scope.data = {};

    $scope.loadData = function()
    {
        $http({
            method  : 'GET',
            url     : apiUrl
         })
        .success(function(data) {
            if (data) {

                // fix date
                for (var i in data.Get_IncidencesResult) {
                    data.Get_IncidencesResult[i].Time = fixDate(data.Get_IncidencesResult[i].Time);
                }

                $scope.data = data.Get_IncidencesResult;
            }
        });
    }

    $scope.loadData();


    function fixDate(date)
    {
        return new Date(parseInt(date.slice(6, -2))).toISOString().substring(0, 19).replace('T', ' ');
    }

}]);
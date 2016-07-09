app.controller('IncidentsController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {  

	$("header nav").attr("class", "incidents");

    $scope.data = {};
    $scope.filterAGVId = "0";

    $scope.loadData = function()
    {
        $http({
            method  : 'GET',
            url     : $rootScope.settings.webServiceURLs.getIncidents
         })
        .success(function(data) {
            if (data) {

                // fix date
                for (var i in data.Get_IncidencesResult) {
                    data.Get_IncidencesResult[i].Time = fixDate(data.Get_IncidencesResult[i].Time);
                }

                // filter by AVGId
                if ($scope.filterAGVId != "0") {
                    $scope.data = $(data.Get_IncidencesResult).filter(function (i,n){
                        return n.IdAGV == $scope.filterAGVId;
                    });
                }
                else {
                    $scope.data = data.Get_IncidencesResult;
                }
            }
        });
    }

    $scope.loadData();
    $rootScope.clearIntervals();
    $rootScope.setInterval($scope.loadData);


    function fixDate(date)
    {
        return new Date(parseInt(date.slice(6, -2))).toISOString().substring(0, 19).replace('T', ' ');
    }

}]);
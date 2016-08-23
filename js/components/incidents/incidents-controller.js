app.controller('IncidentsController', ['$scope', '$rootScope', '$http', 'ArtisterilIntervalService', function($scope, $rootScope, $http, ArtisterilIntervalService) {  

    $scope.data = [];
    $scope.filterAGVId = "0";
    
    ArtisterilIntervalService.clearIntervals();

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
    ArtisterilIntervalService.setInterval($scope.loadData);


    function fixDate(date)
    {
        return new Date(parseInt(date.slice(6, -2)) + 2*60*60*1000).toISOString().substring(0, 19).replace('T', ' ');
    }

}]);
app.controller('SynopticController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) { 
	
	$("header nav").attr("class", "synoptic");

	$scope.tagsData = {};
    $scope.AGVData = {};
	$scope.AGVPositionsData = {};
    $scope.AGVzIndex = 'asc';

    $rootScope.clearIntervals();


	$scope.loadTagsData = function()
    {
        $http({
            method  : 'GET',
            url     : $rootScope.settings.webServiceURLs.getTags
         })
        .success(function(data) {
            if (data) {
                $scope.tagsData = data.Get_TagsResult;
            }
        });
    }
    $scope.loadTagsData();

    $scope.loadAGVPositionsData = function()
    {
        $http({
            method  : 'GET',
            url     : $rootScope.settings.webServiceURLs.getAGVPositions
         })
        .success(function(data) {
            if (data) {
                data = data.Get_AGVS_PositionsResult;
                $scope.AGVPositionsData = {};
                for (i in data) {
                    $scope.AGVPositionsData[data[i].Id] = data[i];
                }
            }
        });
    }
    $scope.loadAGVPositionsData();
    $rootScope.setInterval($scope.loadAGVPositionsData);


    $scope.loadAGVData = function()
    {
        $http({
            method  : 'GET',
            url     : $rootScope.settings.webServiceURLs.getAGVPositions
         })
        .success(function(data) {
            if (data) {
                $scope.AGVData = data.Get_AGVS_PositionsResult;
            }
        });
    }
    $scope.loadAGVData();


    // toggle AGV z-index
    $scope.toggleAGVzIndex = function() {
        $scope.AGVzIndex = ($scope.AGVzIndex == 'asc' ? 'desc' : 'asc');
    }
    $rootScope.setInterval($scope.toggleAGVzIndex);



    /* Incidents ***************************/


    $scope.incidentsData = [];
    $scope.selectedIncidentIndex = 0;

    $scope.loadIncidentsData = function()
    {
        $http({
            method  : 'GET',
            url     : $rootScope.settings.webServiceURLs.getIncidents
         })
        .success(function(data) {
            if (data) {

                // filter by severity
                $scope.incidentsData = $(data.Get_IncidencesResult).filter(function (i,n){
                    return n.Severity == "0";
                });
            }
        });
    }

    function loadNextIncident()
    {
        if (!$scope.incidentsData.length) {
            $scope.loadIncidentsData();
        }
        else {
            ++$scope.selectedIncidentIndex;
            if ($scope.selectedIncidentIndex >= $scope.incidentsData.length) {
                $scope.selectedIncidentIndex = 0;
                $scope.loadIncidentsData();
            }
        }
    }
    loadNextIncident();
    $rootScope.intervals.push(setInterval(loadNextIncident, 1500));







    /* Statisitcs ***************************/

    $scope.statisticsData = {};
    
    $scope.loadStatisticsData = function()
    {
        $http({
            method  : 'GET',
            url     : $rootScope.settings.webServiceURLs.getAGVStatistics
         })
        .success(function(data) {
            if (data) {
                data = data.Get_AGVS_OccupationResult;
                $scope.statisticsData = {};
                for (i in data) {
                    $scope.statisticsData[data[i].IdAGV] = data[i];
                }
            }
        });
    }
    $scope.loadStatisticsData();
    $rootScope.setInterval($scope.loadStatisticsData);
    
}]);
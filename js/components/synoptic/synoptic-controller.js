app.controller('SynopticController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) { 
	
	$("header nav").attr("class", "synoptic");

	$scope.tagsData = {};
    $scope.AGVData = {};
	$scope.AGVPositionsData = {};


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
                $scope.AGVPositionsData = data.Get_AGVS_PositionsResult;
            }
        });
    }
    $scope.loadAGVPositionsData();
    $rootScope.clearIntervals();
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
                    return n.Severity == "1";
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

    $scope.statisticsData = [];
    
    $scope.loadStatisticsData = function()
    {
        $http({
            method  : 'GET',
            url     : $rootScope.settings.webServiceURLs.getAGVStatistics
         })
        .success(function(data) {
            if (data) {
                $scope.statisticsData = data.Get_AGVS_StatisitcsResult;
            }
        });
    }
    $scope.loadStatisticsData();
    $rootScope.setInterval($scope.loadStatisticsData);
    
}]);
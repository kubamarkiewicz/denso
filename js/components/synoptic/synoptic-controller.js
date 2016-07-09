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

}]);
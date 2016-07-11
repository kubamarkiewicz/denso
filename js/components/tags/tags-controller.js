app.controller('TagsController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) { 

	$("header nav").attr("class", "tags");

    $rootScope.clearIntervals();

    $scope.tagsData = {};


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





}]);
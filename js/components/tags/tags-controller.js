app.controller('TagsController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) { 

	$("header nav").attr("class", "tags");

    $rootScope.clearIntervals();

    $scope.tagsData = {};
    $scope.selectedTag = null;

    $(document).keyup(function(e) {
        if (e.keyCode === 27) $scope.cancelEditting();   // escape
    });

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


    $scope.onTagClick = function($event)
    {
        var tagId = $($event.currentTarget).parent().data('id');
        $scope.selectedTag = $scope.tagsData[tagId];
    }

    $scope.cancelEditting = function()
    {
        $scope.selectedTag = null;
        delete $scope.tagsData['new'];
        $scope.loadTagsData();
    }

    $scope.saveTag = function()
    {
        if (!$scope.selectedTag.Id) {
            alert('Enter tag\'s ID');
            return false;
        }

        $http({
            method  : 'GET',
            url     : $rootScope.settings.webServiceURLs.setTag,
            params  : {
                Id: $scope.selectedTag.Id, 
                X: $scope.selectedTag.X,
                Y: $scope.selectedTag.Y,
                IsVertical: $scope.selectedTag.IsVertical
            }
         })
        .success(function(data) {
            $scope.selectedTag = null;
            $scope.loadTagsData();
        });
    }

    $scope.onOverlayClick = function($event)
    {
        var el = $("#mapa .map-overlay");
        var x = $event.pageX - el.offset().left;
        x = (x / el.width() * 100).toFixed(2);
        x = x < 0 ? 0 : x;
        x = x > 100 ? 100 : x;
        var y = $event.pageY - el.offset().top;
        y = (y / el.height() * 100).toFixed(2);
        y = y < 0 ? 0 : y;
        y = y > 100 ? 100 : y;

        $scope.selectedTag.X = x;
        $scope.selectedTag.Y = y;
    }

    $scope.addTag = function()
    {
        $scope.selectedTag = {};
        $scope.selectedTag.X = 50;
        $scope.selectedTag.Y = 50;
        $scope.selectedTag.IsVertical = 0;
        $scope.tagsData['new'] = $scope.selectedTag;
    }

    $scope.deleteTag = function()
    {
        if ($scope.selectedTag.Id && confirm("Are you sure you want to delete this tag?")) {
            $http({
                method  : 'GET',
                url     : $rootScope.settings.webServiceURLs.deleteTag,
                params  : {
                    Id: $scope.selectedTag.Id
                }
             })
            .success(function(data) {
                $scope.selectedTag = null;
                $scope.loadTagsData();
            });
        } 
    }





}]);
var ArtisterilIntervalService = angular.module('ArtisterilIntervalService', [])
.service('ArtisterilIntervalService', function ($rootScope) {

	this.intervals = [];

	this.setInterval = function(callback, miliseconds) {
        if (miliseconds === undefined) {
            // get miliseconds from csettings file
            miliseconds = $rootScope.settings.dataRefreshTime;
        }
        this.intervals.push(setInterval(callback, miliseconds));
    };

    this.clearIntervals = function() {
        for (i in this.intervals) {
            clearInterval(this.intervals[i]);
        }
        this.intervals = [];
    };

});
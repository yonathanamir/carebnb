'use strict';

angular.module('myApp.resource-submission', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/resource-submission', {
            templateUrl: 'resource-submission/resource-submission.html',
            controller: 'resourceSubmissionCtrl',
            controllerAs: 'rscSubCtrl'
        });
    }])

    .controller('resourceSubmissionCtrl', [function () {
        this.hi = 'what';
    }]);
'use strict';

angular.module('myApp.owner-submission', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/owner-submission', {
        templateUrl: 'owner-submission/owner-submission.html',
        controller: 'ownerSubmissionCtrl',
        controllerAs: 'ownerSubCtrl'
    });
}])

.controller('ownerSubmissionCtrl', [function () {
    this.contact = {
        whatsapp: true,
        phone: true,
        email: false,
        sms: false
    }
}]);

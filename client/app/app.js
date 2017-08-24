'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngMaterial',
    'jkAngularCarousel',
    'myApp.resource-submission',
    'myApp.owner-submission',
    'myApp.version',
    'naif.base64'
]).
    config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.otherwise({redirectTo: '/resource-submission'});
    }]);

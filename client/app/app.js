'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngMaterial',
    'jkAngularCarousel',
    'lfNgMdFileInput',
    'myApp.resource-submission',
    'myApp.owner-submission',
    'myApp.room-search',
    'myApp.version',
    'naif.base64',
    'myApp.resource-submission',
    'myApp.resource-approve',
    'myApp.owner-submission',
    'myApp.owner-approve',
    'myApp.version'
]).
    config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.otherwise({redirectTo: '/owner-index'});
    }]);

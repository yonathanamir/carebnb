'use strict';

angular.module('myApp.room-search', ['ngRoute', 'myApp.listing'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/room-search', {
            templateUrl:  'room-search/room-search.html',
            controller:   'roomSearchCtrl',
            controllerAs: 'roomCtrl'
        });
    }])

    .controller('roomSearchCtrl', ['roomSearchService', function (roomSearchService) {
        roomSearchService.getRooms().then(data => {
            this.rooms = data;

            this.rooms.forEach(room => {
                roomSearchService.getOwner(room.owner).then(owner => {
                    room.owner = owner;
                });
            });
        });
    }])
    .filter('requirements', function () {
        return function (input) {
            if (Array.isArray(input)) {
                return input.join(", ");
            }
            else {
                return input;
            }
        }
    });

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

        this.filter = function() {

            if(!this.startDate || !this.endDate) {
                return;
            }

            roomSearchService.getRooms(this.startDate.getTime() / 1000, this.endDate.getTime() / 1000,
                    this.filterKosher, this.kosher, this.gender, this.languages).then(data => {
                this.rooms = data.data.resources;
            });
        };

    }]);

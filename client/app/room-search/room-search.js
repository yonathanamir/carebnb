'use strict';

angular.module('myApp.room-search', ['ngRoute', 'ngMaterial', 'myApp.listing'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/room-search', {
            templateUrl:  'room-search/room-search.html',
            controller:   'roomSearchCtrl',
            controllerAs: 'roomCtrl'
        });
    }])

    .controller('roomSearchCtrl', ['roomSearchService', '$mdToast', function (roomSearchService, $mdToast) {

        this.filter = ()=> {

            if(!this.startDate || !this.endDate) {
                return;
            }

            roomSearchService.getRooms(this.startDate.getTime() / 1000, this.endDate.getTime() / 1000,
                    this.filterKosher, this.kosher, this.gender, this.languages).then(data => {
                this.rooms = data.data.resources;
            });
        };

        this.approveListing = (id) => {
            roomSearchService.approveListing(id).then(() => {
                this.filter();
            });
        };

        this.bookListing = (id, ownerID) => {
            roomSearchService.bookListing(id, ownerID, this.startDate, this.endDate).then(() => {
                $mdToast.show($mdToast.simple()
                    .textContent("Booking completed successfully!")
                    .hideDelay(2000));

                this.filter();
            })
        };

        const init =  ()=> {

            const start = new Date();
            start.setHours(0, 0, 0, 0);
            start.setDate(start.getDate() - 1);
            this.startDate = start;

            const end = new Date();
            end.setHours(0, 0, 0, 0);
            end.setDate(end.getDate() + 7);
            this.endDate = end;

            this.filter();

        };

        init();

    }]);

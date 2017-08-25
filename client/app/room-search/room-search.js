'use strict';

angular.module('myApp.room-search', ['ngRoute', 'ngMaterial', 'myApp.listing'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/room-search', {
            templateUrl:  'room-search/room-search.html',
            controller:   'roomSearchCtrl',
            controllerAs: 'roomCtrl'
        });
    }])

    .controller('roomSearchCtrl', ['roomSearchService', '$mdToast', '$timeout', function (roomSearchService, $mdToast, $timeout) {
        this.filterKosherView = 'false';
        
        this.filter = ()=> {
            this.loading = true;
            this.rooms = [];
            
            if(!this.startDate || !this.endDate) {
                return;
            }

            roomSearchService.getRooms(this.startDate.getTime() / 1000, this.endDate.getTime() / 1000,
                    this.filterKosher, this.kosher, this.gender, this.languages).then(data => {
                this.rooms = data.data.resources;
                this.loading = false;
            });
        };
        
        this.kosherFilter = function(){
            if (this.filterKosherView != 'false'){
                this.kosher = this.filterKosherView == 'yes';
                this.filterKosher = true;
            }
            else
                this.filterKosher = false;
            
            this.filter();
        }

        this.approveListing = (id) => {
            roomSearchService.approveListing(id).then(() => {
                this.filter();
            });
        };

        this.bookListing = (id, ownerID) => {
            this.loading = true;
            roomSearchService.bookListing(id, ownerID, this.startDate, this.endDate).then(() => {
                $timeout(this.filter, 1000);
                $mdToast.show($mdToast.simple()
                    .textContent("Booking completed successfully!")
                    .hideDelay(2000));

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

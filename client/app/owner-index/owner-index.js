'use strict';

angular.module('myApp')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/owner-index', {
            templateUrl: 'owner-index/owner-index.html',
            controller: 'ownerIndexCtrl',
            controllerAs: 'oic'
        });
    }])

    .controller('ownerIndexCtrl', ['ordersService', 'currentUser', 'resourceSubmissionService', function (ordersService, currentUser, resourceSubmissionService) {
        this.user = currentUser.getUser();
        ordersService.getOrders(user.id)
            .then(orders => {

            })
    }]);

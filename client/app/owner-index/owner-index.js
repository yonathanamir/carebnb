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
        if(!this.user) return;

        this.orders = [];
        ordersService.getOrders(this.user.id)
            .then(orders => {
                resourceSubmissionService.getResources().then(resources => {
                    orders.forEach(order => {
                        order.resource = find(resources, order.resource);
                    });
                    this.orders = orders;
                })
            })
    }]);

function find(arr, id){
    for (var i = 0; i < arr.length; i++) {
        var obj = arr[i];
        if(obj.id === id) return obj;
    }
}

angular.module('myApp')
    .factory('ordersService', ['$http', function ($http) {
        let url = 'http://localhost:10010/orders';

        return {
            getOrders
        };

        function getOrders(userId) {
            return $http.get(url).then(o => o.data).then(orders => {
                return orders.filter(order => order.owner === userId);
            });
        }
    }]);
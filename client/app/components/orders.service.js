angular.module('myApp')
    .factory('ordersService', ['$http', function ($http) {
        let url = 'http://localhost:10010/orders';

        return {
            getOrders,
            addOrder
        };

        function addOrder(order){
            return $http.post(url, order).then(o => o.data);
        }

        function getOrders(userId) {
            return $http.get(url).then(o => o.data).then(orders => {
                return orders.filter(order => order.owner === userId);
            });
        }
    }]);
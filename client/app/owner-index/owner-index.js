'use strict';

angular.module('myApp')

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/owner-index', {
        templateUrl: 'owner-index/owner-index.html',
        controller: 'ownerIndexCtrl',
        controllerAs: 'oic'
    });
}])

.controller('ownerIndexCtrl', [function () {

}]);

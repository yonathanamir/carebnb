'use strict';

angular.module('myApp.owner-approve')
    .factory('ownerApproveService', ['$http', function ($http) {
        let url = 'http://localhost:10010/owners';

        return {
            getOwners,
            approve
        };

        function getOwners() {
            return $http.get(url).then(o => o.data);
        }

        function approve(id, value) {
            return $http.get(url+'/:ownerId/approve/:isApproved'.replace(':ownerId', id).replace(':isApproved', value)).then(o => o.data);
        }
    }]);
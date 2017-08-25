'use strict';

angular.module('myApp.owner-submission')
    .factory('ownerSubmissionService', ['$http', function ($http) {
        let url = 'http://localhost:10010/owners';

        return {
            addOwner,
            getOwners
        };

        function getOwners() {
            return $http.get(url).then(o => o.data);
        }

        function addOwner(owner) {
            return $http.post(url, owner).then(o => o.data);
        }
    }]);
'use strict';

angular.module('myApp.owner-submission')
    .factory('ownerSubmissionService', ['$http', function ($http) {
        return {

        };

        function addResource(resource){
            return $http.post('', resource).then(o => o.data);
        }
    }]);
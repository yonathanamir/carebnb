'use strict';

angular.module('myApp.resource-submission')
    .factory('resourceSubmissionService', ['$http', function ($http) {
        return {

        };

        function addResource(resource){
            return $http.post('', resource).then(o => o.data);
        }
    }]);
'use strict';

angular.module('myApp.resource-submission')
    .factory('resourceSubmissionService', ['$http', function ($http) {
        let url = 'http://localhost:10010/resources';

        return {
            addResource,
            getResources
        };

        function getResources() {
            return $http.get(url, resource).then(o => o.data);
        }

        function addResource(resource) {
            return $http.post(url, resource).then(o => o.data);
        }
    }]);
'use strict';

angular.module('myApp.room-search')
    .factory('roomSearchService', ['$http', function ($http) {
        let url = 'http://localhost:10010/resources';
        let gqlURL = 'http://localhost:10010/graphql';

        return {
            getRooms,
            getOwner
        };

        function getRooms() {
            return $http.get(url).then(o => o.data);
        }

        function getOwner(owner) {
            let query = {query: "{owner(id:\"" + owner + "\") {id, contact{name}}}"};
            return $http.post(gqlURL, query).then(o => o.data.data.owner)
        }

    }]);
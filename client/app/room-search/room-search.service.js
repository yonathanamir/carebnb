'use strict';

angular.module('myApp.room-search')
    .factory('roomSearchService', ['$http', function ($http) {
        let url = 'http://localhost:10010/resources';
        let gqlURL = 'http://localhost:10010/graphql';

        return {
            getRooms,
            getOwner
        };

        function getRooms(startDate, endDate, filterKosher, kosher, gender, languages) {

            let queryArguments = "startDate: " + startDate + ", endDate: " + endDate;

            if (filterKosher) {
                queryArguments += ", kosher: " + kosher;
            }

            if(gender) {
                queryArguments += ", gender: " + gender;
            }

            if(languages && languages.length > 0) {
                queryArguments += ", language: " + languages.join(',');
            }

            let query = {query: "{" +
                                    "resources (" + queryArguments + ") {" +
                                        "id " +
                                        "requirements {" +
                                            "kosher " +
                                            "genders " +
                                            "languages " +
                                            "preferences " +
                                        "}" +
                                        "approved " +
                                        "owner {" +
                                            "id " +
                                            "contact {" +
                                                "name " +
                                                "phone " +
                                                "mail " +
                                                "city " +
                                                "address " +
                                            "}" +
                                            "howToContact {" +
                                                "whatsapp " +
                                                "sms " +
                                                "call " +
                                                "email " +
                                            "}" +
                                        "}" +
                                    "}" +
                                "}"};
            return $http.post(gqlURL, query).then(o => o.data);
        }

        function getOwner(owner) {
            let query = {query: "{owner(id:\"" + owner + "\") {id, contact{name}}}"};
            return $http.post(gqlURL, query).then(o => o.data.data.owner)
        }

    }]);
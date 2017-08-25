'use strict';

angular.module('myApp.room-search')
    .factory('roomSearchService', ['$http', function ($http) {
        let url = 'http://localhost:10010/orders';
        let resourceURL = 'http://localhost:10010/resources/'
        let gqlURL = 'http://localhost:10010/graphql';

        return {
            getRooms,
            bookListing,
            approveListing
        };

        function approveListing(id) {
            return $http.get(resourceURL + id + "/approve/true");
        }

        function getRooms(startDate, endDate, filterKosher, kosher, gender, languages) {

            let queryArguments = "startDate: " + startDate + ", endDate: " + endDate;

            if (filterKosher) {
                queryArguments += ", kosher: " + kosher;
            }

            if(gender && gender !== "None") {
                queryArguments += ", gender: \"" + gender + "\"";
            }

            if(languages && languages.length > 0) {
                queryArguments += ", languages: \"" + languages.join(',') + "\"";
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

        function bookListing(id, ownerID, startDate, endDate) {

            const booking = {
                resource: id,
                startDate: startDate.getTime() / 1000,
                endDate: endDate.getTime() / 1000,
                confirmByOwner: false,
                owner: ownerID
            };

            return $http.post(url, booking);
        }

    }]);
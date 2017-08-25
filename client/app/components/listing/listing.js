'use strict';

angular.module('myApp.listing', [])
    .directive('listing', function () {
        return {
            templateUrl: 'components/listing/listing.html',
            scope:       {
                listingData: '=',
                approveListing: '=',
                bookListing: '='
            }
        }
    })
    .filter('requirements', function () {
        return function (input) {
            if (Array.isArray(input)) {
                return input.join(", ");
            }

            if (typeof input === 'boolean') {
                if (input) {
                    return 'V';
                }

                return 'X';
            }

            return input;
        }
    })
    .filter('approved', function () {
        return function (input) {
            if (input) {
                return 'V';
            }

            return 'X';
        }
    });
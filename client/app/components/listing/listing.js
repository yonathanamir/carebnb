'use strict';

angular.module('myApp.listing', [])
    .directive('listing', function () {
        return {
            templateUrl: 'components/listing/listing.html',
            scope: {
                listingData: '='
            }
        }
    });
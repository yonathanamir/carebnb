'use strict';

angular.module('myApp.resource-approve', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/resource-approve', {
            templateUrl: 'resource-approve/resource-approve.html',
            controller: 'resourceApproveCtrl',
            controllerAs: 'rscAprvCtrl'
        });
    }])

    .controller('resourceApproveCtrl', [function () {
        this.owner = {
            img: "http://i.imgur.com/WieRkYv.png",
            name: "Lior Strichash"
        }
        
        this.address = "Kingsroad 1, King's Landing"
        
        this.dataArray = [
            {
                src: 'https://www.travelexcellence.com/images/movil/La_Paz_Waterfall.jpg'
            },
            {
                src: 'http://www.parasholidays.in/blog/wp-content/uploads/2014/05/holiday-tour-packages-for-usa.jpg'
            },
            {
                src: 'http://clickker.in/wp-content/uploads/2016/03/new-zealand-fy-8-1-Copy.jpg'
            },
            {
                src: 'http://images.kuoni.co.uk/73/indonesia-34834203-1451484722-ImageGalleryLightbox.jpg'
            },
            {
                src: 'http://images.kuoni.co.uk/73/malaysia-21747826-1446726337-ImageGalleryLightbox.jpg'
            },
            {
                src: 'https://www.travcoa.com/sites/default/files/styles/flexslider_full/public/tours/images/imperialvietnam-halong-bay-14214576.jpg?itok=O-q1yr5_'
            }
        ];
    }]);

'use strict';

angular.module('myApp.resource-submission', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/resource-submission', {
            templateUrl: 'resource-submission/resource-submission.html',
            controller: 'resourceSubmissionCtrl',
            controllerAs: 'rscSubCtrl'
        });
    }])

    .controller('resourceSubmissionCtrl', ['resourceSubmissionService', function (service) {
        this.user = {
            "contact": {
                "name": "Yonathan",
                "phone": "0503936006",
                "mail": "tunamir18@gmail.com",
                "city": "Kfar Saba",
                "address": "14 Emek Zvulun st."
            },
            "username": "yonathana",
            "password": "efes",
            "id": "1"
        };

        this.submit = () => {
            const pics = [];
            if (this.pictures.length) {
                this.pictures.forEach(pic => {
                    pics.push(`data:${pic.filetype};base64,${pic.base64}`);
                });
            }

            service.addResource({
                owner: this.user.id,
                pictures: pics,
                requirements: {
                    kosher: true,
                    genders: this.genderSelected,
                    languages: this.languageSelected,
                    preferences: this.biography
                }
            })
        };

        this.genderOptions = ['Male', 'Female', 'Trans', 'Other'];
        this.genderSelected = ['Male', 'Female', 'Trans', 'Other'];

        this.languageOptions = ['Hebrew', 'English', 'French', 'Sfat Habet'];
        this.languageSelected = ['Hebrew', 'English'];

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
                src: 'http://www.holidaysaga.com/wp-content/uploads/2014/09/Day08-SIN-day-Free-City-View.jpg'
            },
            {
                src: 'http://images.kuoni.co.uk/73/malaysia-21747826-1446726337-ImageGalleryLightbox.jpg'
            },
            {
                src: 'http://www.kimcambodiadriver.com/uploads/images/tours/kim-cambodia-driver-angkor-wat.jpg'
            },
            {
                src: 'https://www.travcoa.com/sites/default/files/styles/flexslider_full/public/tours/images/imperialvietnam-halong-bay-14214576.jpg?itok=O-q1yr5_'
            }
        ];
    }]);

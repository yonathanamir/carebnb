'use strict';

angular.module('myApp.resource-submission', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/resource-submission', {
            templateUrl: 'resource-submission/resource-submission.html',
            controller: 'resourceSubmissionCtrl',
            controllerAs: 'rscSubCtrl'
        });
    }])

    .controller('resourceSubmissionCtrl', ['resourceSubmissionService', 'currentUser', function (service, currentUser) {
        this.user = currentUser.getUser();
        this.address = this.user.contact.address;
        this.submit = () => {
            const pics = [];
            if (this.pictures && this.pictures.length) {
                this.pictures.forEach(pic => {
                    pics.push(`data:${pic.filetype|| 'image/jpeg'};base64,${pic.base64}`);
                });
            }

            service.addResource({
                owner: this.user.id,
                address: this.address,
                pictures: pics,
                requirements: {
                    kosher: this.kosher,
                    genders: this.genderSelected,
                    languages: this.languageSelected,
                    preferences: this.preferences
                }
            })
        };

        this.genderOptions = ['Male', 'Female', 'Trans', 'Other'];
        this.genderSelected = ['Male', 'Female', 'Trans', 'Other'];

        this.languageOptions = ['Hebrew', 'English', 'French', 'Sfat Habet'];
        this.languageSelected = ['Hebrew', 'English'];
    }]);

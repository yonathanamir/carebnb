'use strict';

angular.module('myApp.owner-submission', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/owner-submission', {
            templateUrl: 'owner-submission/owner-submission.html',
            controller: 'ownerSubmissionCtrl',
            controllerAs: 'ownerSubCtrl'
        });
    }])

    .controller('ownerSubmissionCtrl', ['ownerSubmissionService', function (service) {
        this.submit = ()=> {
            service.addOwner({
                contact: {
                    idPicture: 'THIS WILL NOT WORK BECAUSE THERE WAS NO INPUT',
                    id: this.id,
                    name: this.name,
                    phone: this.phone,
                    email: this.email,
                    city: 'THIS WILL NOT WORK BECAUSE THERE WAS NO INPUT',
                    address: this.address
                },
                profilePicture: 'THIS WILL NOT WORK BECAUSE THERE WAS NO INPUT',
                howToContact:{
                    whatsapp: this.contact.whatsapp,
                    call: this.contact.phone,
                    email: this.contact.email,
                    sms: this.contact.sms
                },
                password: 'THIS WILL NOT WORK BECAUSE THERE WAS NO INPUT'
            });
        };

        this.contact = {
            whatsapp: true,
            phone: true,
            email: false,
            sms: false
        }
    }]);

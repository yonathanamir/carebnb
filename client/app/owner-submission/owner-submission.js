'use strict';

angular.module('myApp.owner-submission', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/owner-submission', {
            templateUrl: 'owner-submission/owner-submission.html',
            controller: 'ownerSubmissionCtrl',
            controllerAs: 'ownerSubCtrl'
        });
    }])

    .controller('ownerSubmissionCtrl', ['ownerSubmissionService', 'currentUser', '$location', function (service, currentUser, $location) {

        function alert2(message) {
            alert(message);
            throw message
        }

        this.submit = ()=> {
            const pf = this.profilePicture ? `data:${this.profilePicture.filetype|| 'image/jpeg'};base64,${this.profilePicture.base64}` : alert2('no profile picture');
            const idp = this.idPicture ? `data:${this.idPicture.filetype|| 'image/jpeg'};base64,${this.idPicture.base64}` : alert2('no id picture');
            service.addOwner({
                contact: {
                    idPicture: idp,
                    id: this.id || alert2('no ID'),
                    name: this.name || alert2('no Name'),
                    phone: this.phone || alert2('no phone'),
                    email: this.email || alert2('no email'),
                    city: this.city || alert2('no city'),
                    address: this.address || alert2('no address')
                },
                profilePicture: pf,
                howToContact: {
                    whatsapp: this.contact.whatsapp,
                    call: this.contact.phone,
                    email: this.contact.email,
                    sms: this.contact.sms
                },
                password: this.password || alert2('no password')
            })
                .then(newUser => {
                    currentUser.switchUser(newUser);
                    $location.path('/resource-submission')
                });
        };

        this.contact = {
            whatsapp: true,
            phone: true,
            email: false,
            sms: false
        }
    }]);

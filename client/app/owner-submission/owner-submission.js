'use strict';

function getBase64(lfDataUrl) {
    function blobToBase64(blob, cb) {
        var reader = new FileReader();
        reader.onload = function () {
            var dataUrl = reader.result;
            var base64 = dataUrl.split(',')[1];
            cb(base64);
        };
        reader.readAsDataURL(blob);
    }

    return new Promise((resolve, reject)=> {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', lfDataUrl, true);
        xhr.responseType = 'blob';
        xhr.onload = function (e) {
            if (this.status == 200) {
                var myBlob = this.response;
                console.log(myBlob);
                blobToBase64(myBlob, o => {
                    resolve(o);
                });
            }
        };
        xhr.send();
    })
}

angular.module('myApp.owner-submission', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/owner-submission', {
            templateUrl: 'owner-submission/owner-submission.html',
            controller: 'ownerSubmissionCtrl',
            controllerAs: 'ownerSubCtrl'
        });
    }])

    .controller('ownerSubmissionCtrl', ['ownerSubmissionService', 'currentUser', '$location', function (service, currentUser, $location) {
        this.step = 0;

        function alert2(message) {
            alert(message);
            throw message
        }

        this.submit = ()=> {
            this.step = 5;
            getBase64(this.profilePicture[0].lfDataUrl)
                .then(base64 => {
                    const pf = this.profilePicture ? `data:${this.profilePicture[0].lfFileType || 'image/jpeg'};base64,${base64}` : alert2('no profile picture');
                    return  service.addOwner({
                        contact: {
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

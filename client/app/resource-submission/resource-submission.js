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

angular.module('myApp.resource-submission', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/resource-submission', {
            templateUrl: 'resource-submission/resource-submission.html',
            controller: 'resourceSubmissionCtrl',
            controllerAs: 'rscSubCtrl'
        });
    }])

    .controller('resourceSubmissionCtrl', ['resourceSubmissionService', 'currentUser', '$q','$mdToast',  '$location', function (service, currentUser, $q, $location, $mdToast) {
        this.step = 0;

        this.user = currentUser.getUser();
        this.address = this.user.contact.address;
        this.submit = () => {
            this.step = 5;
            this.extractPictures(this.pictures)
                .then(b64s=> {
                    const pics = [];

                    b64s.forEach(pic => {
                        pics.push(`data:${'image/jpeg'};base64,${pic}`);
                    });

                    return service.addResource({
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
                })
            .then(()=>{                
                    alert('Thanks for your help!');
                    $location.path('/');
                });
        };

        this.genderOptions = ['Male', 'Female', 'Trans', 'Other'];
        this.genderSelected = ['Male', 'Female', 'Trans', 'Other'];

        this.languageOptions = ['Hebrew', 'English', 'French', 'Sfat Habet'];
        this.languageSelected = ['Hebrew', 'English'];

        this.extractPictures = function (files) {
            return $q.all(files.map(file => {
                return getBase64(file.lfDataUrl);
            }));
        }

    }]);

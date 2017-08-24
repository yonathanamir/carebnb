'use strict';

angular.module('myApp.owner-approve', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/owner-approve', {
        templateUrl: 'owner-approve/owner-approve.html',
        controller: 'ownerApproveCtrl',
        controllerAs: 'ownerAprvCtrl'
    });
}])

.controller('ownerApproveCtrl', [function () {
    this.owners = [
  {
    "contact": {
      "id": "312414659",
      "name": "Gilad",
      "phone": "0546940003",
      "email": "gilad94s@gmail.com",
      "city": "Har Adar",
      "address": "75 Hagay st."
    },
    "howToContact": {
      "whatsapp": false,
      "sms": false,
      "call": false,
      "email": false
    },
    "password": "meleh",
    "id": "0"
  },
  {
    "contact": {
      "id": "312414659",
      "name": "Yonathan",
      "phone": "0503936006",
      "email": "tunamir18@gmail.com",
      "city": "Kfar Saba",
      "address": "14 Emek Zvulun st."
    },
    "howToContact": {
      "whatsapp": false,
      "sms": false,
      "call": false,
      "email": false
    },
    "password": "efes",
    "id": "1"
  },
  {
    "id": "2",
    "profilePicture": "string",
    "contact": {
      "idPicture": "string",
      "id": "string",
      "name": "string",
      "phone": "string",
      "email": "string",
      "city": "string",
      "address": "string"
    },
    "howToContact": {
      "whatsapp": true,
      "sms": true,
      "call": true,
      "email": true
    },
    "password": "string"
  }
];
    
    
}]);

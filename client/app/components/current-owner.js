angular.module('myApp')
    .factory('currentUser', function () {
        return {
            users: [],
            switchUser,
            getUser
        };

        function switchUser(user){
            localStorage.setItem('user', JSON.stringify(user));
            return getUser();
        }

        function getUser(){
            let user = localStorage.getItem('user');
            if(user){
                return JSON.parse(user);
            }
            else {
                switchUser({
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
                });

                return getUser();
            }
        }
    });
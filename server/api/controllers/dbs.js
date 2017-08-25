var MongoClient = require('mongodb').MongoClient;
let Q = require('q');
var url = 'mongodb://carebnb:Password1@ds157833.mlab.com:57833/carebnb';

let conn  = undefined;
function getConnection() {
    return new Promise((resolve, reject) => {
        if(conn) return resolve(conn);
        MongoClient.connect(url, function (err, db) {
            if (err) {
                return console.error(err)
            }
            console.log("Connected correctly to server");
            conn = db;
            resolve(db);
        });
    });
}
function close(db) {
   // return db.close()
}

function getDb() {
    return getConnection()
        .then(db => {
            var collection = db.collection('documents');
            return Q(collection.find({}).toArray()).then((doc, err) => {
                if (err) {
                    return console.error(err)
                }
                close(db);
                return (doc[0]);
            });
        })
}

function setDb(c) {
    return getConnection().then(db => {
        var collection = db.collection('documents');
        collection.updateOne({}, c, (doc, err) => {
            if (err) {
                return console.error(err)
            }
            close(db);
            return doc;
        });
    })
}
//let what = {
//    resources: [
//        {
//            "owner": "0",
//            "requirements": {
//                "kosher": true,
//                "gender": "male",
//                "languages": "hebrew",
//                "preferences": "Anybody but Yonathan Amir thanks."
//            },
//            "approved": false,
//            "address": "Pinsker 50 Tel Aviv",
//            "id": "0"
//        },
//        {
//            "owner": "1",
//            "requirements": {
//                "kosher": false,
//                "gender": "female",
//                "languages": "hebrew,english",
//                "preferences": "I'm only here for Gilad, tell him I'm sorry and I love HIM thanks."
//            },
//            "approved": true,
//            "address": "Pinsker 50 Tel Aviv",
//            "id": "1"
//        }
//    ],
//    owners: [
//        {
//            "contact": {
//                "id": '312414659',
//                "name": "Gilad",
//                "phone": "0546940003",
//                "email": "gilad94s@gmail.com",
//                "city": "Har Adar",
//                "address": "75 Hagay st."
//            },
//            "howToContact": {
//                "whatsup": false,
//                "sms": false,
//                "call": false,
//                "email": false
//            },
//            "password": "meleh",
//            "id": "0"
//        },
//        {
//            "contact": {
//                "id": '312414659',
//                "name": "Yonathan",
//                "phone": "0503936006",
//                "email": "tunamir18@gmail.com",
//                "city": "Kfar Saba",
//                "address": "14 Emek Zvulun st."
//            },
//            "howToContact": {
//                "whatsup": false,
//                "sms": false,
//                "call": false,
//                "email": false
//            },
//            "password": "efes",
//            "id": "1"
//        }
//    ],
//    orders: [],
//    approvals: []
//};
//function first() {
//    return getConnection().then(db => {
//        var collection = db.collection('documents');
//        collection.insertOne(what, (err, doc) => {
//            if (err) {
//                return console.error(err)
//            }
//            close(db);
//            return doc;
//        });
//    })
//}
////first();
//getDb().then(doc => console.dir(doc));

module.exports = {
    getDb,
    setDb
};
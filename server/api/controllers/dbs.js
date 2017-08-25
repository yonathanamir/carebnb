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

module.exports = {
    getDb,
    setDb
};
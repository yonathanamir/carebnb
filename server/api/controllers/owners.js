module.exports = {
    addOwner,
    getOwners
};

const db = require('./dbs');

function addOwner(req, res, next) {
    db.getDb().then(doc => {
        let owners = doc.owners;
        let owner = req.swagger.params.owner.value;
        owner.id = owners.length.toString();
        owners.push(owner);

        return db.setDb(doc)
            .then(s => {
                res.json(owner);
            });
    });
}

function getOwners(req, res) {
    db.getDb().then(doc => {
        let owners = doc.owners;
        res.json(owners)
    });
}
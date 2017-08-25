module.exports = {
    addOwner,
    getOwners
};

const uuid = require('uuid/v4');
const db = require('./dbs');
const _ = require('lodash');

function addOwner(req, res, next) {
    db.getDb().then(doc => {
        let owners = doc.owners;
        let owner = req.swagger.params.owner.value;
        owner.id = uuid();
        owners.push(owner);

        return db.setDb(doc)
            .then(s => {
                res.json(owner);
            });
    });
}

function approveOwner(req, res){
    let id = req.swagger.params.ownerId.value;
    let isApproved = req.swagger.params.isApproved.value;

    db.getDb().then(doc => {
        let owners = doc.owners;

        let owner = _.find(owners, {id});
        owner.approved = isApproved;

        return db.setDb(doc)
            .then(s => {
                res.json(owner);
            });
    })
}

function getOwners(req, res) {
    db.getDb().then(doc => {
        let owners = doc.owners;
        res.json(owners)
    });
}
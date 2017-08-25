module.exports = {
    addResource,
    getResources,
    approveResource
};

const _ = require('lodash');
const uuid = require('uuid/v4');
const db = require('./dbs');

function addResource(req, res, next){
    db.getDb().then(doc => {
        let resources = doc.resources;

        let resource = req.swagger.params.resource.value;
        resource.id = uuid();
        resource.approved = false;
        resources.push(resource);

        return db.setDb(doc)
            .then(s => {
                res.json(resource);
            });
    });
}

function getResources(req, res){
    db.getDb().then(doc => {
        let resources = doc.resources;
        res.json(resources)
    });
}

function approveResource(req, res){
    let id = req.swagger.params.resourceId.value;
    let isApproved = req.swagger.params.isApproved.value;

    db.getDb().then(doc => {
        let resources = doc.resources;

        let resource = _.find(resources, {id});
        resource.approved = isApproved;

        return db.setDb(doc)
            .then(s => {
                res.json(resource);
            });
    })
}
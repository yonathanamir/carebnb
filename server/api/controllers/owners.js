module.exports = {
    addOwner,
    getOwners
};

const owners = require('./dbs').owners;

function addOwner(req, res, next){
    let resource = req.swagger.params.owner.value;
    resource.id = owners.length.toString();
    owners.push(resource);
    res.json(resource);
}

function getOwners(req, res){
    res.json(owners)
}
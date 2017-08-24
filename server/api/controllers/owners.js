module.exports = {
    addOwner,
    getOwners
};

const owners = require('./dbs').owners;

function addOwner(req, res, next){
    let owner = req.swagger.params.owner.value;
    owner.id = owners.length.toString();
    owners.push(owner);
    res.json(owner);
}

function getOwners(req, res){
    res.json(owners)
}
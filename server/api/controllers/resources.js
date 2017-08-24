module.exports = {
    addResource,
    getResources
};

const resources = require('./dbs').resources;

function addResource(req, res, next){
    let resource = req.swagger.params.resource.value;
    resource.id = resources.length.toString();
    resources.push(resource);
    res.json(resource);
}

function getResources(req, res){
    res.json(resources)
}
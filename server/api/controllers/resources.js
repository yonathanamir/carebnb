module.exports = {
    addResource,
    getResources
};

const db = require('./dbs');

function addResource(req, res, next){
    db.getDb().then(doc => {
        let resources = doc.resources;

        let resource = req.swagger.params.resource.value;
        resource.id = resources.length.toString();
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
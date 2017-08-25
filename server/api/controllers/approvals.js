module.exports = {
    addApproval,
    getApprovals
};

const uuid = require('uuid/v4');
const _ = require('lodash');
const db = require('./dbs');

function addApproval(req, res) {
    db.getDb().then(doc => {
        let {approvals, orders, owners} = doc;
        let approval = req.swagger.params.approval.value;
        approval.id = uuid();

        if (approval.type === 'order') {
            _.find(orders, {id: approval.fk}).approved = approval.approved;
        }

        if (approval.type === 'owner') {
            _.find(owners, {id: approval.fk}).approved = approval.approved;
        }

        approvals.push(approval);
        return db.setDb(doc)
            .then(s => {
                res.json(approval);
            });
    })
}

function getApprovals(req, res) {
    db.getDb().then(doc => {
        res.json(doc.approvals)
    });
}
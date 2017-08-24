module.exports = {
    addApproval,
    getApprovals
};

const db = require('./dbs');

function addApproval(req, res) {
    db.getDb().then(doc => {
        let {approvals, orders, owners} = doc;
        let approval = req.swagger.params.approval.value;
        approval.id = approvals.length.toString();

        if (approval.type === 'order') {
            orders[parseInt(approval.fk)].approved = approval.approved;
        }

        if (approval.type === 'owner') {
            owners[parseInt(approval.fk)].approved = approval.approved;
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
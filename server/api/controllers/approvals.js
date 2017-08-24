module.exports = {
    addApproval,
    getApprovals
};

const approvals = require('./dbs').approvals;
const orders = require('./dbs').orders;
const owners = require('./dbs').owners;

function addApproval(req, res){
    let approval = req.swagger.params.approval.value;
    approval.id = approvals.length.toString();

    if(approval.type === 'order'){
        orders[parseInt(approval.fk)].approved = approval.approved;
    }

    if(approval.type === 'owner'){
        owners[parseInt(approval.fk)].approved = approval.approved;
    }

    approvals.push(approval);
    res.json(approval);
}

function getApprovals(req, res){
    res.json(approvals)
}
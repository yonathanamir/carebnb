module.exports = {
    addOrder,
    getOrders,
    ownerConfirmOrder
};

const uuid = require('uuid/v4');
const db = require('./dbs');
const _ = require('lodash');

function addOrder(req, res) {
    db.getDb().then(doc => {
        let orders = doc.orders;
        let order = req.swagger.params.order.value;
        order.id = uuid();
        order.confirmByOwner = false;
        orders.push(order);

        return db.setDb(doc)
            .then(s => {
                res.json(order);
            });
    });
}

function getOrders(req, res) {
    db.getDb().then(doc => {
        res.json(doc.orders)
    });
}

function ownerConfirmOrder(req, res) {
    let orderId = req.swagger.params.orderId.value;
    let isApproved = req.swagger.params.isApproved.value;

    db.getDb().then(doc => {
        _.find(doc.orders, {id: orderId}).confirmByOwner = isApproved;
        db.setDb(doc)
            .then(s => {
                res.json(true);
            });
    });
}
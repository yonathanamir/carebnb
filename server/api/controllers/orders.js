module.exports = {
    addOrder,
    getOrders,
    ownerConfirmOrder
};

const db = require('./dbs');

function addOrder(req, res) {
    db.getDb().then(doc => {
        let orders = doc.orders;
        let order = req.swagger.params.order.value;
        order.id = orders.length.toString();
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

    db.getDb().then(doc => {
        doc.orders[orderId].confirmByOwner = true;
        db.setDb(doc)
            .then(s => {
                res.json(true);
            });
    });
}
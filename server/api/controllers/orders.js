module.exports = {
    addOrder,
    getOrders,
    ownerConfirmOrder
};

const orders= require('./dbs').orders;

function addOrder(req, res){
    let order = req.swagger.params.order.value;
    order.id = orders.length.toString();
    order.confirmByOwner = false;
    orders.push(order);
    res.json(order);
}

function getOrders(req, res){
    res.json(orders)
}

function ownerConfirmOrder(req, res){
    let orderId = req.swagger.params.orderId.value;

    orders[orderId].confirmByOwner = true;
}
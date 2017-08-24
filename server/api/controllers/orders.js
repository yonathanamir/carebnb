module.exports = {
    addOrder,
    getOrders
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
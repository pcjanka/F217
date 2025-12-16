const orderModel = require('../models/orderModel');

function history(req, res) {
    orderModel.getAllOrders((err, orders) => {
        res.render('pages/orders', { orders });
    });
}

module.exports = {
    history
};

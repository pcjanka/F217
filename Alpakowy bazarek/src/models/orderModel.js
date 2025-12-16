const { getDB } = require('../data/connection');

function getCollection() {
    return getDB().collection('orders');
}

function createOrder(data, callback) {
    getCollection()
        .insertOne(data)
        .then(() => callback())
        .catch(err => console.error(err));
}

function getAllOrders(callback) {
    getCollection()
        .find({})
        .sort({ createdAt: -1 })
        .toArray()
        .then(orders => callback(null, orders))
        .catch(err => callback(err));
}

module.exports = {
    createOrder,
    getAllOrders
};

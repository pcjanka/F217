const { ObjectId } = require('mongodb');
const { getDB } = require('../data/connection');

function getCollection() {
    return getDB().collection('alpacas');
}

function getAllAlpacas(filter, sort, callback) {
    getCollection().find(filter).sort(sort).toArray()
        .then(data => callback(null, data))
        .catch(err => callback(err));
}

function getAlpacaById(id, callback) {
    getCollection().findOne({ _id: new ObjectId(id) })
        .then(data => callback(null, data))
        .catch(err => callback(err));
}

function addAlpaca(data, callback) {
    getCollection().insertOne(data)
        .then(result => callback(null, result))
        .catch(err => callback(err));
}

function updateAlpaca(id, data, callback) {
    getCollection().updateOne(
        { _id: new ObjectId(id) },
        { $set: data }
    ).then(() => callback());
}

function deleteAlpaca(id, callback) {
    getCollection().deleteOne({ _id: new ObjectId(id) })
        .then(() => callback());
}

function getAllColors(callback) {
    getCollection().distinct('color')
        .then(colors => callback(null, colors));
}

module.exports = {
    getAllAlpacas,
    getAlpacaById,
    addAlpaca,
    updateAlpaca,
    deleteAlpaca,
    getAllColors
};

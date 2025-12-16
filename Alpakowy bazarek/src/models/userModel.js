const { ObjectId } = require('mongodb');
const { getDB } = require('../data/connection');

function getCollection() {
    return getDB().collection('users');
}

function getUser(username, callback) {
    getCollection()
        .findOne({ username })
        .then(user => callback(null, user))
        .catch(err => callback(err));
}

function getAllUsers(callback) {
    getCollection()
        .find()
        .toArray()
        .then(users => callback(null, users))
        .catch(err => callback(err));
}

function createUser(data, callback) {
    getCollection()
        .insertOne(data)
        .then(result => callback(null, result))
        .catch(err => callback(err));
}

function deleteUser(id, callback) {
    getCollection()
        .deleteOne({ _id: new ObjectId(id) }) // ✅ KLUCZOWE
        .then(result => callback(null, result))
        .catch(err => callback(err));
}

module.exports = {
    getUser,
    getAllUsers,
    createUser,
    deleteUser
};

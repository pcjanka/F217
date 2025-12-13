const { getDB } = require('../data/connection');

function getCollection() {
    return getDB().collection('users');
}

function getUser(username, callback) {
    getCollection().findOne({ username })
        .then(user => callback(null, user))
        .catch(err => callback(err));
}

function createUser(user, callback) {
    getCollection().insertOne(user)
        .then(result => callback(null, result))
        .catch(err => callback(err));
}

function getAllUsers(callback) {
    getCollection().find().toArray()
        .then(users => callback(null, users))
        .catch(err => callback(err));
}

function deleteUser(username, callback) {
    getCollection().deleteOne({ username })
        .then(result => callback(null, result))
        .catch(err => callback(err));
}

module.exports = {
    getUser,
    createUser,
    getAllUsers,
    deleteUser
};

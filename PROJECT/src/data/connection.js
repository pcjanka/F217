const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb://localhost:27017');
let db;

async function connectDB() {
    await client.connect();
    db = client.db('alpacaApp');
    console.log('MongoDB connected to DB:', db.databaseName);
}

function getDB() {
    if (!db) throw new Error('DB not connected');
    return db;
}

module.exports = { connectDB, getDB };

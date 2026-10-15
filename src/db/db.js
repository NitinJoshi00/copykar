const mongoose = require('mongoose');

// Reuse one connection per warm serverless instance and wait for it before
// handling database-backed requests.
let connectionPromise;

async function connectDB() {
    if (mongoose.connection.readyState === 1) {
        return mongoose;
    }

    const uri = process.env.MONGO_URI;
    if (!uri) {
        throw new Error('MONGO_URI is not set in the environment');
    }

    if (!connectionPromise) {
        connectionPromise = mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000,
        }).then((connectedMongoose) => {
            console.log('Connected to MongoDB');
            return connectedMongoose;
        }).catch((error) => {
            // Permit a later invocation to retry if this connection attempt failed.
            connectionPromise = undefined;
            throw error;
        });
    }

    return connectionPromise;
}

module.exports = connectDB;
    
const mongoose = require('mongoose');
const serverConfig = require('./serverConfig');


// The below function helps to connect to a mongoDB server
async function connectDB() {
    try {
        await mongoose.connect(serverConfig.MONGO_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Failed to connect to MongoDB");
        console.error(error);
    }
}

module.exports = connectDB;
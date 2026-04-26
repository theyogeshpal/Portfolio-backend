const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        console.log('Connecting to MongoDB...');
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;

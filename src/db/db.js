const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            console.error('❌ ERROR: MONGODB_URI is not defined in environment variables!');
        } else {
            const maskedUri = uri.replace(/:([^@]+)@/, ':****@');
            console.log(`Attempting to connect to: ${maskedUri}`);
        }

        const conn = await mongoose.connect(uri || 'mongodb://127.0.0.1:27017/portfolio');
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;

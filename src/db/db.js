const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) throw new Error('MONGODB_URI is missing!');

        console.log('Connecting to MongoDB Shards...');
        const conn = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000 // 5 seconds timeout
        });
        
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('❌ MongoDB Connection Error:');
        console.error(error.message);
        // Don't exit process immediately locally, let the user see the error
        if (process.env.NODE_ENV === 'production') process.exit(1);
    }
};

module.exports = connectDB;

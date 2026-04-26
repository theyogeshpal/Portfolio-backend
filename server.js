const app = require('./src/app');
const connectDB = require('./src/db/db');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // 1. First Connect to Database
        await connectDB();
        
        // 2. Then Start Express Server
        app.listen(PORT, () => {
            console.log(`🚀 Server is officially running on port ${PORT}`);
        });
    } catch (err) {
        console.error('❌ CRITICAL ERROR DURING STARTUP:');
        console.error(err);
        process.exit(1);
    }
};

startServer();

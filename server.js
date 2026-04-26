process.on('uncaughtException', (err) => {
    console.error('FATAL: UNCAUGHT EXCEPTION!');
    console.error(err);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    console.error('FATAL: UNHANDLED REJECTION!');
    console.error(err);
    process.exit(1);
});

const app = require('./src/app');
const connectDB = require('./src/db/db');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

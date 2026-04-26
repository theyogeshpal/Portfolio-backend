const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
    year: { type: String, required: true },
    title: { type: String, required: true },
    board: String,
    description: String,
    image: String,
    logo: String,
    side: { type: String, enum: ['left', 'right'], default: 'left' },
    aos: String
}, { timestamps: true });

module.exports = mongoose.model('Education', educationSchema);

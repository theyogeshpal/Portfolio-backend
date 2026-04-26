const mongoose = require('mongoose');

const timelineSchema = new mongoose.Schema({
    year: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    image: String,
    side: { type: String, enum: ['left', 'right'], default: 'left' },
    aos: String
}, { timestamps: true });

module.exports = mongoose.model('Timeline', timelineSchema);

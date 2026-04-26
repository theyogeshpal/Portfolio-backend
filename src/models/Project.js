const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    link: { type: String, default: '#' },
    images: [{ type: String, required: true }],
    technologies: { type: String, required: true },
    description: { type: String, required: true },
    ratings: [Number],
    averageRating: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);

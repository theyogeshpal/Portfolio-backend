const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    year: { type: String, required: true },
    companyLogo: String,
    company: { type: String, required: true },
    position: { type: String, required: true },
    location: String,
    description: String,
    detailedDescription: String,
    technologies: [String],
    images: [String]
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);

const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    contact: {
        name: String,
        phone: String,
        whatsapp: String,
        email: String,
        location: String,
        address: String,
        linkedin: String,
        github: String,
        instagram: String,
        facebook: String,
        discord: String,
        twitter: String,
        cv: String,
        subheading: String,
        tagline: String,
        opportunityStatus: String,
        socialLinks: [{
            name: String,
            url: String,
            icon: String,
            color: String
        }],
        profileImage: String,
        footerImage: String
    },
    about: {
        para1: String,
        para2: String,
        para3: String,
        images: [String],
        strengths: [String],
        technical: [String]
    }
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Admin = require('./models/Admin');
const Project = require('./models/Project');
const Experience = require('./models/Experience');
const Education = require('./models/Education');
const Timeline = require('./models/Timeline');
const Profile = require('./models/Profile');
const Message = require('./models/Message');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
console.log('Middleware initialized');

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
console.log('Static routes initialized');

// Multer Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only images and PDFs are allowed.'));
        }
    }
});

// Upload Route
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const url = `${protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({ url, filename: req.file.originalname });
});

app.post('/api/upload-multiple', upload.array('images', 10), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'No files uploaded' });
    }
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const urls = req.files.map(file => `${protocol}://${req.get('host')}/uploads/${file.filename}`);
    res.json({ urls });
});

// Admin Routes
app.post('/api/admin/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });

        if (admin && (await admin.matchPassword(password))) {
            const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || 'secret', {
                expiresIn: '30d'
            });

            res.json({
                _id: admin._id,
                email: admin.email,
                token
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Portfolio Data (All-in-one for frontend)
app.get('/api/portfolio-data', async (req, res) => {
    try {
        const [profile, projects, experiences, educations, timeline, messages] = await Promise.all([
            Profile.findOne(),
            Project.find({ isVisible: true }).sort({ createdAt: 1 }),
            Experience.find().sort({ createdAt: 1 }),
            Education.find().sort({ year: -1 }),
            Timeline.find().sort({ year: -1 }),
            Message.find().sort({ createdAt: -1 })
        ]);

        res.json({
            contact: profile?.contact || {},
            about: profile?.about || {},
            projects: projects || [],
            experience: experiences || [],
            education: educations || [],
            timeline: timeline || [],
            messages: messages || []
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Admin - get all projects including hidden
app.get('/api/projects/all', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: 1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Projects
app.post('/api/projects', async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.put('/api/projects/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/projects/:id', async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: 'Project deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/projects/:id/rate', async (req, res) => {
    try {
        const { rating } = req.body;
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        
        project.ratings.push(rating);
        const sum = project.ratings.reduce((a, b) => a + b, 0);
        project.averageRating = sum / project.ratings.length;
        
        await project.save();
        res.json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.patch('/api/projects/:id/toggle-visibility', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        project.isVisible = !project.isVisible;
        await project.save();
        res.json({ isVisible: project.isVisible });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Experience
app.post('/api/experience', async (req, res) => {
    try {
        const exp = new Experience(req.body);
        await exp.save();
        res.status(201).json(exp);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.put('/api/experience/:id', async (req, res) => {
    try {
        const exp = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(exp);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/experience/:id', async (req, res) => {
    try {
        await Experience.findByIdAndDelete(req.params.id);
        res.json({ message: 'Experience deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Education
app.post('/api/education', async (req, res) => {
    try {
        const edu = new Education(req.body);
        await edu.save();
        res.status(201).json(edu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.put('/api/education/:id', async (req, res) => {
    try {
        const edu = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(edu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/education/:id', async (req, res) => {
    try {
        await Education.findByIdAndDelete(req.params.id);
        res.json({ message: 'Education deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Timeline
app.post('/api/timeline', async (req, res) => {
    try {
        const item = new Timeline(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.put('/api/timeline/:id', async (req, res) => {
    try {
        const item = await Timeline.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/timeline/:id', async (req, res) => {
    try {
        await Timeline.findByIdAndDelete(req.params.id);
        res.json({ message: 'Timeline item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Messages
app.get('/api/messages', async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete('/api/messages/:id', async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.json({ message: 'Message deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Profile/About
app.put('/api/profile', async (req, res) => {
    try {
        let profile = await Profile.findOne();
        if (profile) {
            profile.contact = { ...profile.contact, ...req.body.contact };
            profile.about = { ...profile.about, ...req.body.about };
            await profile.save();
        } else {
            profile = new Profile(req.body);
            await profile.save();
        }
        res.json(profile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        if(!name || !email || !message) {
            return res.status(400).json({ message: 'Please provide name, email and message' });
        }
        const newMessage = new Message({ name, email, subject, message });
        await newMessage.save();
        res.status(201).json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Health check
app.get('/', (req, res) => {
    res.send('Portfolio API is running...');
});

console.log('All routes registered');

module.exports = app;

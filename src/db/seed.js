const mongoose = require('mongoose');
const Project = require('../models/Project');
const Experience = require('../models/Experience');
const Education = require('../models/Education');
const Timeline = require('../models/Timeline');
const Profile = require('../models/Profile');
const Admin = require('../models/Admin');
const connectDB = require('./db');
require('dotenv').config();

const portfolioData = {
    contact: {
        name: 'Yogesh Pal',
        phone: '+91 7817095043',
        whatsapp: '7817095043',
        email: 'yogeshpal1309@gmail.com',
        location: 'Bareilly, Uttar Pradesh',
        linkedin: 'https://www.linkedin.com/in/pal-yogesh',
        github: 'https://github.com/theyogeshpal',
        instagram: 'https://www.instagram.com/the_yogeshpal',
        facebook: 'https://facebook.com',
        discord: 'https://discord.com',
        twitter: 'https://x.com',
        cv: './images/Yogesh-Pal.pdf',
        subheading: 'DISCUSS A PROJECT OR JUST WANT TO SAY HI? MY INBOX IS OPEN FOR ALL.',
        tagline: '"Software Engineer @SadaPay | building refactornow.dev"',
        opportunityStatus: 'No',
        socialLinks: [
            { name: 'Github', url: 'https://github.com/theyogeshpal', icon: 'fa-brands fa-github', color: '#333' },
            { name: 'LinkedIn', url: 'https://www.linkedin.com/in/pal-yogesh', icon: 'fa-brands fa-linkedin-in', color: '#0077b5' },
            { name: 'Email', url: 'mailto:yogeshpal1309@gmail.com', icon: 'fa-solid fa-envelope', color: '#ea4335' },
            { name: 'Instagram', url: 'https://gitlab.com', icon: 'fa-brands fa-instagram', color: '#4d43a9' },
            { name: 'Facebook', url: 'https://facebook.com', icon: 'fa-brands fa-facebook-f', color: '#3b5998' },
            { name: 'StackOverflow', url: 'https://stackoverflow.com/users/32329246/yogesh-pal', icon: 'fa-brands fa-stack-overflow', color: '#f48024' }
        ],
        profileImage: './images/P1119420.JPG',
        footerImage: './images/digicoders-logo-circle.png'
    },
    about: {
        para1: "Hello! I'm Yogesh Pal, a dedicated Full Stack Developer and CSE student with a passion for building high-performance web applications. My expertise spans across the entire development lifecycle, from architecting robust backends using ASP.NET Core and Spring Boot to crafting modern, responsive frontends with React.js, Tailwind CSS, and Bootstrap.",
        para2: "I specialize in creating seamless user experiences powered by efficient Rest APIs and SQL databases (MSSQL & MySQL). My technical toolkit is further enhanced by advanced animation libraries like GSAP and AOS, ensuring every project I deliver is not just functional, but visually exceptional.",
        para3: 'Awarded the "Star Performance" honor at Digicoders Technologies, I bring a proven track record of dedication, logical problem-solving, and rapid skill acquisition to every challenge. I thrive on turning complex ideas into scalable, production-ready reality.',
        images: ['./images/Yogesh-Pal-Profile.png', './images/Yogesh-Pal-about.png'],
        strengths: [
            'Logical and Analytical ability for new project and application.',
            'Good verbal and presentation skills.',
            'A quick learner and eager to up to date in IT industry with Programming language Development tools.',
            'Public Speaking and Presentation Skills.'
        ],
        technical: [
            'C, C#, Java',
            "Rest API's, Postman",
            'ASP.NET Core MVC, Entity Framework, MSSQL',
            'Spring Boot, JSP, MySQL, Java web development',
            'React.js, Express.js, MongoDb, Node.js',
            'AOS, Animate.CSS, GSAP',
            'JQuery, JSON, AJAX, Bootstrap, Tailwind CSS',
            'HTML, HTML-5, CSS, CSS-3, JavaScript',
            'Git, GitHub'
        ]
    },
    experience: [
        {
            year: "2025 - Present",
            companyLogo: "./images/digicoders-logo-circle.png",
            company: "Digicoders Technologies Pvt. Ltd.",
            position: "Dot Net Developer",
            location: "Lucknow, UP",
            description: "Working on ASP.NET Core MVC projects, developing REST APIs, and creating responsive web applications.",
            detailedDescription: "As a Dot Net Developer at Digicoders Technologies, I work on developing enterprise-level web applications using ASP.NET Core MVC framework. My responsibilities include designing and implementing RESTful APIs, database management with MSSQL, creating responsive user interfaces with Bootstrap, and collaborating with cross-functional teams to deliver high-quality software solutions. I have successfully delivered multiple projects.",
            technologies: ["ASP.NET Core", "C#", "MSSQL", "Entity Framework", "Bootstrap"],
            images: [
                "./images/P1119568.JPG",
                "./images/P1119422.JPG",
                "./images/P1119420.JPG",
                "./images/P1119415.JPG"
            ]
        }
    ],
    timeline: [
        {
            year: "2025",
            title: "Summer Training (45 Days)",
            description: "Completed intensive training at Digicoders Technologies Pvt. Ltd., specializing in Dot Net Core development and earning the \"Star Performance Award\".",
            image: "./images/summer-training.jpeg",
            side: "left",
            aos: "fade-right"
        },
        {
            year: "2023",
            title: "Advanced Diploma in IT",
            description: "Successfully completed 15 months Advanced diploma in Information Technology, gaining deep knowledge in software development and IT infrastructure.",
            image: "./images/ADIT.jpeg",
            side: "right",
            aos: "fade-left"
        },
        {
            year: "2023",
            title: "Li-Fi & Wi-Fi Workshop",
            description: "Received Certificate of Appreciation in Li-Fi & Wi-Fi Workshop organized by the Institute of Computer Education, Bareilly.",
            image: "./images/li-fi&wi-fi.jpeg",
            side: "left",
            aos: "fade-right"
        }
    ],
    education: [
        {
            year: "2023 - Present",
            title: "Polytechnic Diploma in CSE",
            board: "BTEUP",
            description: "Currently pursuing Polytechnic Diploma in Computer Science Engineering, focusing on software development, programming, and modern web technologies.",
            image: "./images/The-Yogesh-Pal.jpg",
            side: "left",
            aos: "fade-right",
            logo: "./images/polytechnic-logo.jpg"
        },
        {
            year: "2025",
            title: "Intermediate",
            board: "NIOS Board",
            description: "Completed Intermediate education from National Institute of Open Schooling (NIOS) Board with focus on Science stream.",
            image: "./images/Yogesh-Pal-Profile.png",
            side: "right",
            aos: "fade-left",
            logo: "./images/nios.jpg"
        },
        {
            year: "2023",
            title: "High School",
            board: "CBSE Board",
            description: "Completed High School education from Central Board of Secondary Education (CBSE) with excellent academic performance.",
            image: "./images/Yogesh-Pal-about.png",
            side: "left",
            aos: "fade-right",
            logo: "./images/cbse.jpg"
        }
    ],
    projects: [
        {
            title: "Core Archive",
            category: "Digital Library (Website + Admin Panel)",
            link: "https://core-archive.netlify.app/",
            images: ["./images/image.png"],
            technologies: "React, Express, MongoDB, NodeJS, TailwindCSS",
            description: "A comprehensive parking management system with multi-level access control. Features include real-time parking slot monitoring, automated billing, user management, and detailed analytics dashboard for administrators."
        },
        {
            title: "AuraPark",
            category: "Parking Management System (Website + Admin + Super Admin )",
            link: "https://aurapark.runasp.net/",
            images: ["./images/Screenshot 2026-01-16 134513.png"],
            technologies: "ASP.NET Core, C#, MSSQL, Bootstrap",
            description: "A comprehensive parking management system with multi-level access control. Features include real-time parking slot monitoring, automated billing, user management, and detailed analytics dashboard for administrators."
        },
        {
            title: "Syntax Academy",
            category: "Student Management System (Website + Admin Panel)",
            link: "https://syntax-academy.runasp.net/",
            images: ["./images/syntax-academy.png"],
            technologies: "ASP.NET Core, C#, Entity Framework",
            description: "Complete student management solution with attendance tracking, grade management, course enrollment, and parent-teacher communication portal. Built with Entity Framework for robust data management."
        },
        {
            title: "RiskFlight",
            category: "Library Management System",
            link: "#",
            images: ["./images/LMS.png"],
            technologies: "ASP.NET Core, C#, MSSQL, ADO.Net",
            description: "Digital library management system featuring book cataloging, member management, issue/return tracking, fine calculation, and comprehensive reporting. Developed using ADO.NET for optimized database operations."
        },
        {
            title: "Nurture Nest",
            category: "Non Government Organization (Website)",
            link: "https://nurture-nest-foundation.netlify.app/",
            images: ["./images/nurture-nest.png"],
            technologies: "HTML, CSS, JavaScript",
            description: "Responsive NGO website showcasing social initiatives, donation campaigns, volunteer programs, and impact stories. Features include event calendar, gallery, and contact forms for community engagement."
        },
        {
            title: "Amber Archives",
            category: "E-Commerce Website (Website)",
            link: "https://amber-ecommerce.netlify.app/",
            images: ["./images/Amber-Archives.png"],
            technologies: "React.js, Tailwind CSS",
            description: "Modern e-commerce platform with product catalog, shopping cart, wishlist functionality, and responsive design. Built with React.js for dynamic user experience and Tailwind CSS for sleek styling."
        },
        {
            title: "Er. Yogesh Pal",
            category: "Personal Portfolio (Website)",
            link: "#",
            images: ["./images/Yogesh-pal.png"],
            technologies: "HTML, CSS, JS, Bootstrap",
            description: "Professional portfolio website showcasing projects, skills, certifications, and achievements. Features smooth animations, responsive design, and interactive elements to highlight technical expertise."
        },
        {
            title: "Fanta",
            category: "Built Using GSAP (Webpage)",
            link: "https://fanta-yogesh.netlify.app/",
            images: ["./images/fanta.png"],
            technologies: "GSAP, HTML, CSS",
            description: "Creative animated webpage demonstrating advanced GSAP animation techniques. Features scroll-triggered animations, smooth transitions, and interactive elements for an engaging user experience."
        },
        {
            title: "Dream Places",
            category: "Trip Planner (Website)",
            link: "#",
            images: ["./images/travel-website.png"],
            technologies: "HTML, CSS, JavaScript",
            description: "Travel planning website featuring destination guides, itinerary builder, budget calculator, and booking information. Designed with responsive layouts for seamless browsing across all devices."
        },
        {
            title: "Calculator",
            category: "Built Using Javascript (Mini Project)",
            link: "https://theyogeshpal.github.io/calculator-yogesh-pal/",
            images: ["./images/calculator.png"],
            technologies: "JavaScript, HTML, CSS",
            description: "Functional calculator application with basic arithmetic operations, clear functionality, and keyboard support. Built with vanilla JavaScript to demonstrate core programming concepts."
        }
    ]
};

const seedDB = async () => {
    try {
        await connectDB();

        // Clear existing data
        await Promise.all([
            Project.deleteMany({}),
            Experience.deleteMany({}),
            Education.deleteMany({}),
            Timeline.deleteMany({}),
            Profile.deleteMany({}),
            Admin.deleteMany({})
        ]);

        // Insert new data
        await Profile.create({
            contact: portfolioData.contact,
            about: portfolioData.about
        });
        await Project.insertMany(portfolioData.projects);
        await Experience.insertMany(portfolioData.experience);
        await Education.insertMany(portfolioData.education);
        await Timeline.insertMany(portfolioData.timeline);

        // Seed Admin
        await Admin.create({
            email: 'theyogeshpal@gmail.com',
            password: 'Kmc@2004'
        });

        console.log('Database Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedDB();

const express = require('express');
const Project = require('../models/Project');
const router = express.Router();
const multer = require('multer');
const path = require('path');


// router.post('/', async (req, res) => {
//   try {
//     const project = new Project(req.body);
//     await project.save();
//     res.status(201).json(project);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Destination folder
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)); // Use unique filenames
//   },
// });

// const upload = multer({ storage: storage });

// this is working previ
// const fs = require('fs');


// // Path to the uploads directory
// const uploadDir = path.join(__dirname, 'uploads');

// // Create the uploads directory if it doesn't exist
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
    
//     cb(null, uploadDir); // Store files in 'uploads' folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique filename
//   }
// });

// const upload = multer({ storage: storage });

const storage = multer.diskStorage({
   destination: function (req,file,cb) {
     cb(null, "uploads/");
   },
   filename: function (req, file,cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
   },
});
const upload = multer({ storage: storage });



router.post('/', upload.single('image'), async (req,res) => {
  try {
    
    const projectData = {
      name: req.body.name,
      key: req.body.key,
      type: req.body.type,
      assigned: JSON.parse(req.body.assigned), 
      image: req.file ? `uploads/${req.file.filename.replace(/\\/g, '/')}` : null,
      startDate:req.body.startDate,
      endDate:req.body.endDate,
      createdBy:req.body.createdBy,
    };

    const project = new Project(projectData);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// const backlogRoutes = require('./backlogRoutes');
// router.use('/:projectId/backlogs', backlogRoutes);


module.exports = router;


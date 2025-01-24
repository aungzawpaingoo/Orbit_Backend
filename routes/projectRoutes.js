// const express = require('express');
// const Project = require('../models/Project');
// const router = express.Router();

// router.post('/', async (req, res) => {
//   try {
//     const project = new Project(req.body);
//     await project.save();
//     res.status(201).json(project);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// router.get('/', async (req, res) => {
//   try {
//     const projects = await Project.find();
//     res.status(200).json(projects);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.get('/:id', async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.id);
//     if (!project) return res.status(404).json({ message: 'Project not found' });
//     res.status(200).json(project);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.put('/:id', async (req, res) => {
//   try {
//     const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!project) return res.status(404).json({ message: 'Project not found' });
//     res.status(200).json(project);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// router.delete('/:id', async (req, res) => {
//   try {
//     const project = await Project.findByIdAndDelete(req.params.id);
//     if (!project) return res.status(404).json({ message: 'Project not found' });
//     res.status(200).json({ message: 'Project deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // const backlogRoutes = require('./backlogRoutes');
// // router.use('/:projectId/backlogs', backlogRoutes);


// module.exports = router;



const express = require('express');
const Project = require('../models/Project');
const router = express.Router();


app.use(express.json({ limit: '50mb' }));  
app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));

router.post('/', async (req, res) => {
  try {
    const project = new Project(req.body);
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




module.exports = router;

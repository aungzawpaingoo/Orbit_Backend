const express = require('express');
const Project = require('../models/Project');
const router = express.Router();

// CREATE a new project
router.post('/', async (req, res) => {
  try {
    const { name, key, type, assigned, image } = req.body;

    // Validate that required fields are present
    if (!name || !key || !type || !assigned || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newProject = new Project({
      name,
      key,
      type,
      assigned, // Directly using the assigned details from the request
      image,
    });

    await newProject.save();
    res.status(201).json(newProject); // Return the created project
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a specific project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE a project
router.put('/:id', async (req, res) => {
  try {
    const { name, key, type, assigned, image } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { name, key, type, assigned, image },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE a project
router.delete('/:id', async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

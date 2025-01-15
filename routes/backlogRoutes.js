const express = require('express');
const Backlog = require('../models/Backlog');
const Project = require('../models/Project');
const router = express.Router({ mergeParams: true }); 

router.post('/:projectId/backlogs', async (req, res) => {
  try {
    const projectId = req.params.projectId;

    
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Create a backlog
    const backlog = new Backlog({
      ...req.body,
      project: projectId, // Link backlog to the project
    });

    await backlog.save();
    res.status(201).json(backlog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all backlogs for a project
router.get('/:projectId/backlogs', async (req, res) => {
  try {
    const projectId = req.params.projectId;

    // Retrieve backlogs for the specified project
    const backlogs = await Backlog.find({ project: projectId });
    res.status(200).json(backlogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific backlog by ID for a project
router.get('/:projectId/backlogs/:backlogId', async (req, res) => {
  try {
    const { projectId, backlogId } = req.params;

    // Find the backlog and ensure it belongs to the correct project
    const backlog = await Backlog.findOne({ _id: backlogId, project: projectId });
    if (!backlog) {
      return res.status(404).json({ message: 'Backlog not found' });
    }

    res.status(200).json(backlog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a specific backlog for a project
router.put('/:projectId/backlogs/:backlogId', async (req, res) => {
  try {
    const { projectId, backlogId } = req.params;

    // Find the backlog and ensure it belongs to the correct project
    const backlog = await Backlog.findOne({ _id: backlogId, project: projectId });
    if (!backlog) {
      return res.status(404).json({ message: 'Backlog not found' });
    }

    // Update the backlog with the provided data
    Object.assign(backlog, req.body);
    await backlog.save();
    res.status(200).json(backlog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a specific backlog for a project
router.delete('/:projectId/backlogs/:backlogId', async (req, res) => {
  try {
    const { projectId, backlogId } = req.params;

    // Find the backlog and ensure it belongs to the correct project
    const backlog = await Backlog.findOne({ _id: backlogId, project: projectId });
    if (!backlog) {
      return res.status(404).json({ message: 'Backlog not found' });
    }

    await backlog.deleteOne();
    res.status(200).json({ message: 'Backlog deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

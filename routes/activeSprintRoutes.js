const express = require('express');
const ActiveSprint = require('../models/ActiveSprint');
const Project = require('../models/Project');
const router = express.Router({ mergeParams: true });


router.post('/:projectId/activesprints', async (req, res) => {
    try {
    
        const projectId = req.params.projectId;

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        } 

        const activeSprint = new ActiveSprint({
            ...req.body,
            project: projectId,
        });

        await activeSprint.save();
        res.status(201).json(activeSprint);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});




router.get('/:projectId/activesprints', async (req, res) => {
    try {
    
        const projectId = req.params.projectId;

        const activeSprints = await ActiveSprint.find({ project: projectId });
        res.status(200).json(activeSprints);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/:projectId/activesprints/:activeSprintId', async (req, res) => {
    try {
        
        const projectId = req.params.projectId;

        const activeSprint = await ActiveSprint.findOne({_id: activeSprintId, project: projectId});
        if (!activeSprint) {
            return res.status(404).json({ message: 'Active Sprint not found' });
        }

        res.status(200).json(activeSprint);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



router.put('/:projectId/activesprints/:activeSprintId', async (req, res) => {
    try {
        
        const {projectId, activeSprintId} = req.params;

        const activeSprint = await ActiveSprint.findOne({_id: activeSprintId, project: projectId});

        if(!activeSprint) {
            return res.status(404).json({ message: 'Active Sprint not found' });
        }

        Object.assign(activeSprint, req.body);
        await activeSprint.save();
        res.status(200).json(activeSprint);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.delete('/:projectId/activesprints/:activeSprintId', async (req, res) => {

    try {
        
        const {projectId, activeSprintId} = req.params;

        const activeSprint = await ActiveSprint.findOne({_id: activeSprintId, project: projectId});
        if (!activeSprint) {
            return res.status(404).json({ message: 'Active Sprint not found' });
        }

        await activeSprint.deleteOne();
        res.status(200).json({ message: 'Active Sprint deleted successfully' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;


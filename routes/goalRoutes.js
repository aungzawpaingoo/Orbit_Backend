const express = require('express');
const Goals = require('../models/Goals');
const Project = require('../models/Project');
const router = express.Router({ mergeParams: true });


router.post('/:projectId/goals', async (req, res) => {
    try {
        
        const projectId = req.params.projectId;

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const goals = new Goals({
            ...req.body,
            project: projectId,
        });

        await goals.save();
        res.status(201).json(goals);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.get('/:projectId/goals', async (req, res) => {
    try {
        
        const projectId = req.params.projectId;

        const goals = await Goals.find({ project: projectId });
        res.status(200).json(goals);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/:projectId/goals/:goalsId', async (req, res) => {
   try {
    
    const projectId = req.params.projectId;

    const goals = await Goals.findOne ({_id: goalsId, project: projectId});
    if (!goals) {
        return res.status(404).json({ message: 'Goals not found' });
    }

    res.status(200).json(goals);

   } catch (error) {
    res.status(500).json({ error: error.message });
   }
});


router.put('/:projectId/goals/:goalsId', async (req, res) => {
    try {
        
        const projectId = req.params.projectId;

        const goals = await Goals.findOne({_id: goalsId, project: projectId});

        if(!goals) {
            return res.status(404).json({ message: 'Goals not found' });
        }

        Object.assign(goals, req.body);
        await goals.save();
        res.status(200).json(goals);

    } catch (error) {
     res.status(500).json({ error: error.message });   
    }
});


router.delete('/:projectId/goals/:goalsId', async (req, res) => {
    try {
        
        const projectId = req.params.projectId;

        const goals = await Goals.findOne({_id: goalsId, project: projectId});
        if(!goals) {
            return res.status(404).json({ message: 'Goals not found' });
        }

        await goals.remove();
        res.status(200).json({ message: 'Goals deleted' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
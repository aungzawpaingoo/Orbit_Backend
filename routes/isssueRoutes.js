const express = require('express');
const Issues = require('../models/Issues');
const Project = require('../models/Project');
const router = express.Router({ mergeParams: true });


router.post('/:projectId/issues', async (req, res) => {
    try {
        const projectId = req.params.projectId;

        const project = await Project.findById(projectId);
        if(!project){
            return res.status(404).json({ message: 'Project not found' });
        }

        const issues = new Issues({
            ...req.body,
            project: projectId,
        });

        await issues.save();
        res.status(201).json(issues);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.get('/:projectId/issues', async (req, res) => {
    try {
        const projectId = req.params.projectId;

        const issues = await Issues.find({ project: projectId });
        res.status(200).json(issues);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/:projectId/issues/:issueId', async (req, res) => {
    try {
        
        const projectId = req.params.projectId;

        const issues = await Issues.findOne({_id: issueId, project: projectId});
        if (!issues) {
            return res.status(404).json({ message: 'Issues not found' });
        }

        res.status(200).json(issues);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.put('/:projectId/issues/:issueId', async (req, res) => {
    try {
        
        const {projectId, issueId} = req.params;

        const issues = await Issues.findOne({_id: issueId, project: projectId});

        if(!issues){
            return res.status(404).json({ message: 'Issues not found' });
        }

        Object.assign(issues, req.body);
        await issues.save();
        res.status(200).json(issues);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.delete('/:projectId/issues/:issueId', async (req, res) => {
    try {
        
        const {projectId, issueId} = req.params;

        const issues = await Issues.findOne({_id: issueId, project: projectId});
        if(!issues){
            return res.status(404).json({ message: 'Issues not found' });
        }

        await issues.deleteOne();
        res.status(200).json({ message: 'Issues deleted' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
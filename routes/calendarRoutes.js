const express = require('express');
const Calendar = require('../models/Calendar');
const Project = require('../models/Project');
const router = express.Router({ mergeParams: true });


router.post('/:projectId/calendars', async (req,res) => {

    try {
        
        const projectId = req.params.projectId;

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const calendar = new Calendar({
            ...req.body,
            project: projectId,
        });

        await calendar.save();
        res.status(201).json(calendar);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

});


router.get('/:projectId/calendars', async (req,res) => {
    try {
        
        const projectId = req.params.projectId;

        const calendars = await Calendar.find({ project: projectId });
        res.status(200).json(calendars);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/:projectId/calendars/:calendarId', async (req,res) => {

   try {
    
    const projectId = req.params.projectId;

    const calendar = await Calendar.findOne({_id: calendarId, project: projectId});
    if(!calendar){
        return res.status(404).json({ message: 'Calendar not found' });
    }

    res.status(200).json(calendar);

   } catch (error) {
    res.status(500).json({ error: error.message });
   }

});



router.put('/:projectId/calendars/:calendarId', async (req,res) => {
    try {
        
        const {projectId, calendarId} = req.params;

        const calendar = await Calendar.findOne({_id: calendarId, project: projectId});

        if(!calendar) {
            return res.status(404).json({ message: 'Calendar not found' });
        }

        Object.assign(calendar, req.body);
        await calendar.save();
        res.status(200).json(calendar);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



router.delete('/:projectId/calendars/:calendarId', async (req,res) => {
    try {
        
        const {projectId, calendarId} = req.params;

        const calendar = await Calendar.findOne({_id: calendarId, project: projectId});
        if(!calendar) {
            return res.status(404).json({ message: 'Calendar not found' });
        }

        await calendar.deleteOne();
        res.status(200).json({ message: 'Calendar deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;



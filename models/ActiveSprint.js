const mongoose = require('mongoose');

const activeSprintSchema = new mongoose.Schema({

    sprintName: { type: String, required: true },

    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },

    description: { type: String, required: true },

    startDate: { type: Date, required: true },

    endDate: { type: Date, required: true },

    sprintGoal: { type: String, required: true },

    progress: { type: Number, default: 0, min: 0, max: 100 },

    retrospectiveNotes: { type: String },

    attachments: [{
        filename: { type: String },
        fileUrl: { type: String },
    }],

    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low',
    },


});


module.exports = mongoose.model('ActiveSprint', activeSprintSchema);
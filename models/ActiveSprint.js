const mongoose = require('mongoose');

const activeSprintSchema = new mongoose.Schema({

    name: { type: String, required: true },

    description: { type: String, required: true },

    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low',
    },

    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },

    status: {
        type: String,
        enum: ['To Do', 'In Progress', 'Done'],
        default: 'To Do',
    },

    assignee: {
        name: { type: String, required: true },
        avatar: { type: String, required: true }
    },

    dueDate: { type: Date, required: true },


});


module.exports = mongoose.model('ActiveSprint', activeSprintSchema);
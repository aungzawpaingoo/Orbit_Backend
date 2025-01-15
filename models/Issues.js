const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    
    name: { type: String, required: true },

    description: { type: String, required: true },


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

    resource:[{
        type: String,
        required: false
    }],

});

module.exports = mongoose.model('Issue', issueSchema);
const mongoose = require('mongoose');

const backLogSchema = new mongoose.Schema({
  name: { type: String, required: true },

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

  estimatedHours: { type: String ,required: false },


});

module.exports = mongoose.model('Backlog', backLogSchema);


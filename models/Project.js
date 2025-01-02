const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    key: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    assigned: { 
      name: { type: String, required: true },
      avatar: { type: String, required: true },
    },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    key: { type: String, required: true },
    type: { type: String, required: true },
    assigned: {
      name: { type: String, required: true },
      avatar: { type: String },
    },
    image: { type: String },
    startDate: { type: Date, required: true }, 
    endDate: { type: Date, required: true },
    createdBy:{ type: String, required: true },
  },
  { timestamps: true }

);

module.exports = mongoose.model('Project', projectSchema);

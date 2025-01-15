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
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);

const mongoose = require('mongoose');

const calendarSchema = new mongoose.Schema({

    title: { type: String, required: true },

    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },

    statTime: { type: Date, required: true },

    endTime: { type: Date, required: true },

    locationType: {
        type: String,
        enum: ['Online', 'In Person'],
        required: true
    },

    location: {
        type: String,
        required: function () { return this.locationType === 'inperson'; }
    }

});


module.exports = mongoose.model('Calendar', calendarSchema);
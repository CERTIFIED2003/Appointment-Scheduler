const mongoose = require('mongoose');

const meetingSchema = mongoose.Schema(
    {
        id: String,
        creatorId: String,
        summary: String,
        description: String,
        timeZone: String,
        start: String,
        end: String,
        organizer: {
            name: String,
            email: String,
        },
        attendees: [{
            email: String
        }],
    },
    {
        timestamps: true,
    }
);

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;
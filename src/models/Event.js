const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
    {
        title: {type: String, required: true, unique: true},
        description: {type: String, required: false},
        discount: {type: Number, required: true, unique: false},
        image: {type: String, required: true},
        start_date: {type: Date, required: true},
        end_date: {type: Date, required: true},
    },
    {
        timestamps: true
    }
);

const Event = mongoose.model("events", eventSchema);
module.exports = Event;
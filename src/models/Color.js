const mongoose = require('mongoose');
const colorSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        color: {type: String, required: true},
        description: {type: String, nullable: true},
    },
    {
        timestamps: true
    }
);
const Color = mongoose.model("Colors", colorSchema);
module.exports = Color;
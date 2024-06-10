const mongoose = require('mongoose');
const attributeSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        description: {type: String, required: true},
    },
    {
        timestamps: true
    }
);
const Attribute = mongoose.model("Attributes", attributeSchema);
module.exports = Attribute;
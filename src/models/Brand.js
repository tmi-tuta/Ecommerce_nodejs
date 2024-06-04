const mongoose = require('mongoose');
const brandSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        location: {type: String, nullable: true},
        description: {type: String, nullable: true},
    },
    {
        timestamps: true
    }
);
const Brand = mongoose.model("Brands", brandSchema);
module.exports = Brand;
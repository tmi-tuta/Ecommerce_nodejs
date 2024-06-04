const mongoose = require('mongoose');
const roleSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
    },
    {
        timestamps: true
    }
);
const Role = mongoose.model("Roles", roleSchema);
module.exports = Role;
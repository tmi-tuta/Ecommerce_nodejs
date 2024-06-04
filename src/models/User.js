const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        user_role: {type: Number, default: false},
        access_token: {type: String, required: true},
        refresh_token: {type: String, required: true},
    },
    {
        timestamps: true
    }
);
const User = mongoose.model("Users", userSchema);
module.exports = User;
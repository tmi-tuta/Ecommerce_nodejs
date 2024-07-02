const mongoose = require('mongoose');

const heartSchema = new mongoose.Schema(
    {
        product_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true},
        user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true},
    },
    {
        timestamps: true
    }
);

heartSchema.index({ product_id: 1, user_id: 1 }, { unique: true });

const heart = mongoose.model("hearts", heartSchema);
module.exports = heart;
const mongoose = require('mongoose');

const eventProductSchema = new mongoose.Schema(
    {
        product_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true},
        event_id: {type: mongoose.Schema.Types.ObjectId, ref: 'events', required: true},
    },
    {
        timestamps: true
    }
);

const eventProduct = mongoose.model("eventProducts", eventProductSchema);
module.exports = eventProduct;
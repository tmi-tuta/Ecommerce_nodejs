const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const imageProductSchema = new mongoose.Schema(
    {
        // _id: { type: Number },
        product_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true},
        image: {type: String, required: true},
    },
    {
        timestamps: true
    }
);

// imageProductSchema.plugin(AutoIncrement, {inc_field: '_id'});

const imageProduct = mongoose.model("ImageProducts", imageProductSchema);
module.exports = imageProduct;
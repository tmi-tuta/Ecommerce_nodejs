const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const imageProductSchema = new mongoose.Schema(
    {
        product_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true},
        image: {type: String, required: true},
    },
    {
        timestamps: true
    }
);

imageProductSchema.plugin(AutoIncrement, {inc_field: 'id'});

const imageProduct = mongoose.model("ImageProducts", imageProductSchema);
module.exports = imageProduct;
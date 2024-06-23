const mongoose = require('mongoose');

const productColorSchema = new mongoose.Schema(
    {
        color_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Colors', required: true},
        product_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true},
    },
    {
        timestamps: true
    }
);

const ProductColor = mongoose.model("product_colors", productColorSchema);
module.exports = ProductColor;
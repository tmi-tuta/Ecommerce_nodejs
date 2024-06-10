const mongoose = require('mongoose');

const productAttributeSchema = new mongoose.Schema(
    {
        attribute_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Attributes', required: true},
        product_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true},
    },
    {
        timestamps: true
    }
);

const ProductAttribute = mongoose.model("product_attributes", productAttributeSchema);
module.exports = ProductAttribute;
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const productSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        price: {type: Number, required: true, unique: false},
        description: {type: String, required: true},
        brand_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Brands', required: true},
        type_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Types', required: true},
        image: {type: String, required: true},
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model("Products", productSchema);
module.exports = Product;
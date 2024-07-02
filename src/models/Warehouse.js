const mongoose = require('mongoose');

const wareHouseSchema = new mongoose.Schema(
    {
        product_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true, unique: true},
        quantity: {type: Number, required: true},
    },
    {
        timestamps: true
    }
);

const wareHouse = mongoose.model("warehouses", wareHouseSchema);
module.exports = wareHouse;
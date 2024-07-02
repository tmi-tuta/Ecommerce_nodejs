const mongoose = require('mongoose');

const wareHouseInSchema = new mongoose.Schema(
    {
        warehouse_id: {type: mongoose.Schema.Types.ObjectId, ref: 'warehouses', required: true},
        user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true},
        quantity: {type: Number, required: true},
        price: {type: Number, required: true},
    },
    {
        timestamps: true
    }
);

const wareHouseIn = mongoose.model("warehouseins", wareHouseInSchema);
module.exports = wareHouseIn;
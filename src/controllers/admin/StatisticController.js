const mongoose = require("mongoose");
const Order = require("../../models/Order");

const getSalesStatistics = async (req, res) => {
    try {
        const { period } = req.query;
        const statusFilter = 4;

        // Match orders by status
        const match = {
            status: statusFilter
        };

        // Group by the specified period
        let group;
        switch (period) {
            case 'day':
                group = {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    totalRevenue: { $sum: "$cart.totalPrice" }
                };
                break;
            case 'week':
                group = {
                    _id: { $week: "$date" },
                    totalRevenue: { $sum: "$cart.totalPrice" }
                };
                break;
            case 'month':
                group = {
                    _id: { $month: "$date" },
                    totalRevenue: { $sum: "$cart.totalPrice" }
                };
                break;
            case 'year':
                group = {
                    _id: { $year: "$date" },
                    totalRevenue: { $sum: "$cart.totalPrice" }
                };
                break;
            default:
                return res.status(400).send('Invalid period specified');
        }

        const statistics = await Order.aggregate([
            { $match: match },
            { $group: group },
            { $sort: { _id: 1 } }
        ]);

        res.json(statistics);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getSalesStatistics
};

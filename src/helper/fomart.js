// Helper function to format currency
const moment = require('moment');

const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

const formatNewCurrency = (value, discount) => {
    const price = value - (value*discount/100);
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const formatDateTime = (value) => {
    const dateTime = moment(value).format('DD/MM/YYYY HH:SS');
    return dateTime;
}

module.exports = {
    formatCurrency,
    formatNewCurrency,
    formatDateTime,
};
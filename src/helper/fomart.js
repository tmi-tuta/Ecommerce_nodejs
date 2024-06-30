// Helper function to format currency
const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

const formatNewCurrency = (value, discount) => {
    const price = value - (value*discount/100);
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

module.exports = {
    formatCurrency,
    formatNewCurrency,
};
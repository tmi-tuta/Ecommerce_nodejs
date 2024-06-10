// Helper function to format currency
const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

module.exports = {
    formatCurrency,
};
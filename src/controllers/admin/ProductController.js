const Product = require('../../models/Product');
const ImageProduct = require('../../models/ImageProduct');

const index = async(req, res) => {
    try {
        const products = await Product.find(); 
        res.render('admin/product/index', { products: products, title: 'Products manager' });
    } catch (error) {
        console.error('Error retrieving products:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    index
};
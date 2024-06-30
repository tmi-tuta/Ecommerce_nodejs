const Product = require('../../models/Product');
const Type = require('../../models/Type');
const ImageProduct = require('../../models/ImageProduct');
const ProductAttribute = require('../../models/ProductAttribute');
const ProductColor = require('../../models/ProductColor');

const show = async(req,res) => {
    id = req.params.id;
    const product = await Product.findOne({ _id: id }).populate([{path: 'brand_id'}, {path: 'type_id'}]).exec(); 
    const images = await ImageProduct.find({ product_id : id }).populate([{path: 'product_id'}]).exec();
    const attributes = await ProductAttribute.find({ product_id : id }).populate([{path: 'attribute_id'}]).exec();
    const colors = await ProductColor.find({ product_id : id }).populate([{path: 'color_id'}]).exec();
    const types = await Type.find(); 
    res.render('client/product/show', {
        product: product, 
        images: images, 
        attributes: attributes, 
        colors: colors, 
        types: types, 
        title: 'Product detail',
        layout: 'client/layout/main',
    });
}

const productOfType = async(req, res) => {
    var typeId = req.params.id;
    const types = await Type.find(); 
    const products = await Product.find({ type_id : typeId }).exec();
    res.render('client/product/list_product', {
        title: 'Home',
        types: types, 
        products: products,
        layout: 'client/layout/main',
    });
}

module.exports = {
    show,
    productOfType,
};
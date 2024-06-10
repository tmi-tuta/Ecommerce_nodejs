const Product = require('../../models/Product');
const Type = require('../../models/Type');
const Brand = require('../../models/Brand');
const ImageProduct = require('../../models/ImageProduct');

const index = async(req, res) => {
    try {
        const products = await Product.find().populate([{path: 'brand_id'}, {path: 'type_id'}]).exec(); 
        res.render('admin/product/index', { products: products, title: 'Products manager' });
    } catch (error) {
        console.error('Error retrieving products:', error);
        res.status(500).send('Internal Server Error');
    }
}

const create = async(req,res) => {
    const types = await Type.find(); 
    const brands = await Brand.find();
    res.render('admin/product/create', {types: types, brands: brands, title: 'Create Product'});
}

const store =async(req, res) => {
    try {
        const image = req.files['image'] ? req.files['image'][0].path.replace('public', '') : '';
        const sub_images = req.files['sub_image'] ? req.files['sub_image'].map(file => file.path.replace('public', '')) : [];
        const { name, price, description, brand_id, type_id } = req.body;
        const createProduct = await Product.create({
            name: name,
            price: price,
            description: description,
            brand_id: brand_id,
            type_id: type_id,
            image: image,
        });
        for (const sub_image of sub_images) {
            const createSubImage = await ImageProduct.create({
                product_id: createProduct._id,
                image: sub_image,
            });
        };
        res.redirect('/admin/product/');
    } catch (error) {
        console.log(error);
    }
}

const show = async(req,res) => {
    id = req.params.id;
    const product = await Product.findOne({ _id: id }).populate([{path: 'brand_id'}, {path: 'type_id'}]).exec(); 
    const images = await ImageProduct.find({ product_id : id }).populate([{path: 'product_id'}]).exec();
    res.render('admin/product/show', {product: product, images: images, title: 'Product detail'});
}

module.exports = {
    index,
    create,
    store,
    show,
};
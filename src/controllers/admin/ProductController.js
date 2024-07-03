const Product = require('../../models/Product');
const Type = require('../../models/Type');
const Brand = require('../../models/Brand');
const Attribute = require('../../models/Attribute');
const Color = require('../../models/Color');
const ImageProduct = require('../../models/ImageProduct');
const ProductAttribute = require('../../models/ProductAttribute');
const ProductColor = require('../../models/ProductColor');

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
    const attributes = await Attribute.find();
    const colors = await Color.find();
    res.render('admin/product/create', {types: types, brands: brands, attributes: attributes, colors: colors, title: 'Create Product'});
}

const store =async(req, res) => {
    try {
        const image = req.files['image'] ? req.files['image'][0].path.replace('public', '') : '';
        const sub_images = req.files['sub_image'] ? req.files['sub_image'].map(file => file.path.replace('public', '')) : [];
        const { name, price, description, brand_id, type_id } = req.body;
        const attributeIds = req.body.attribute_id;
        const colorIds = req.body.color_id;
        const createProduct = await Product.create({
            name: name,
            price: price,
            description: description,
            brand_id: brand_id,
            type_id: type_id,
            image: image,
        });
        // Save Sub images
        for (const sub_image of sub_images) {
            const createSubImage = await ImageProduct.create({
                product_id: createProduct._id,
                image: sub_image,
            });
        };
        // Save Attributes
        for (const attributeId of attributeIds) {
            const createAttribute = await ProductAttribute.create({
                attribute_id: attributeId,
                product_id: createProduct._id,
            });
        };
        // Save colors
        for (const colorId of colorIds) {
            const createColorProduct = await ProductColor.create({
                color_id: colorId,
                product_id: createProduct._id,
            });
        };
        res.redirect('/admin/product/');
    } catch (error) {
        console.log(error);
        res.redirect('/admin/product/');
    }
}
const edit = async(req,res) => {
    id = req.params.id;
    const product = await Product.findOne({ _id: id }).populate([{path: 'brand_id'}, {path: 'type_id'}]).exec(); 
    const images = await ImageProduct.find({ product_id : id }).populate([{path: 'product_id'}]).exec();
    const productAttr = await ProductAttribute.find({ product_id : id }).populate([{path: 'attribute_id'}]).exec();
    const productColors = await ProductColor.find({ product_id : id }).populate([{path: 'color_id'}]).exec();
    const types = await Type.find(); 
    const brands = await Brand.find();  
    const attributes = await Attribute.find();
    const colors = await Color.find();
    res.render('admin/product/edit', {
        product: product, 
        images: images,
        productAttr: productAttr,
        productColors: productColors,
        types: types, 
        brands: brands, 
        attributes: attributes, 
        colors: colors, 
        title: 'Product edit'
    });
}

const update =async(req, res) => {

}

const show = async(req,res) => {
    id = req.params.id;
    const product = await Product.findOne({ _id: id }).populate([{path: 'brand_id'}, {path: 'type_id'}]).exec(); 
    const images = await ImageProduct.find({ product_id : id }).populate([{path: 'product_id'}]).exec();
    const attributes = await ProductAttribute.find({ product_id : id }).populate([{path: 'attribute_id'}]).exec();
    const colors = await ProductColor.find({ product_id : id }).populate([{path: 'color_id'}]).exec();
    res.render('admin/product/show', {
        product: product, 
        images: images, 
        attributes: attributes, 
        colors: colors, 
        title: 'Product detail'
    });
}

module.exports = {
    index,
    create,
    store,
    edit,
    update,
    show,
};
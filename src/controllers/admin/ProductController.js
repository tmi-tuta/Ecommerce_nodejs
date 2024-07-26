const Product = require('../../models/Product');
const Type = require('../../models/Type');
const Brand = require('../../models/Brand');
const Attribute = require('../../models/Attribute');
const Color = require('../../models/Color');
const ImageProduct = require('../../models/ImageProduct');
const ProductAttribute = require('../../models/ProductAttribute');
const ProductColor = require('../../models/ProductColor');
const EventProduct = require('../../models/EventProduct');

const index = async(req, res) => {
    try {
        const products = await Product.find().populate([{path: 'brand_id'}, {path: 'type_id'}]).exec(); 
        res.render('admin/product/index', { 
            products: products, 
            title: 'Quản lý sản phẩm',
            message: req.flash('message'), 
        });
    } catch (error) {
        console.error('Error retrieving products:', error);
        res.status(500).send('Internal Server Error');
    }
}

const create = async(req,res) => {
    const types = await Type.find(); 
    const brands = await Brand.find();  
    const attributes = await Attribute.find().sort({ name: 1 });
    const colors = await Color.find();
    res.render('admin/product/create', {types: types, brands: brands, attributes: attributes, colors: colors, title: 'Tạo sản phẩm'});
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
        req.flash('message', 'Thêm thành công.');
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
        title: 'Chỉnh sửa sản phẩm'
    });
}

const update =async(req, res) => {
    try {
        const { name, price, description, brand_id, type_id } = req.body;
        const attributeIds = req.body.attribute_id || [];
        const colorIds = req.body.color_id || [];
    
        // Xử lý hình ảnh chính
        const image = req.files['image'] ? req.files['image'][0].path.replace('public', '') : '';
    
        // Xử lý hình ảnh phụ
        const sub_images = req.files['sub_image'] ? req.files['sub_image'].map(file => file.path.replace('public', '')) : [];
    
        // Cập nhật sản phẩm
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.productId,  // ID sản phẩm từ tham số URL
            {
                name: name,
                price: price,
                description: description,
                brand_id: brand_id,
                type_id: type_id,
                image: image,
            },
            { new: true }  // Trả về đối tượng đã được cập nhật
        );
    
        if (!updatedProduct) {
            return res.status(404).redirect('/admin/product/');
        }
        // Xóa hình ảnh phụ cũ
        await ImageProduct.deleteMany({ product_id: updatedProduct._id });
        // Lưu hình ảnh phụ mới
        for (const sub_image of sub_images) {
            await ImageProduct.create({
                product_id: updatedProduct._id,
                image: sub_image,
            });
        }
        await ProductAttribute.deleteMany({ product_id: updatedProduct._id });
        for (const attributeId of attributeIds) {
            await ProductAttribute.create({
                attribute_id: attributeId,
                product_id: updatedProduct._id,
            });
        }
        await ProductColor.deleteMany({ product_id: updatedProduct._id });
        for (const colorId of colorIds) {
            await ProductColor.create({
                color_id: colorId,
                product_id: updatedProduct._id,
            });
        }
        req.flash('message', 'Cập nhật thành công.');
        res.redirect('/admin/product/');
    } catch (error) {
        console.log(error);
        res.redirect('/admin/product/');
    }
    
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
        title: 'Chi tiết sản phẩm'
    });
}

const destroy = async(req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Product not found.'
            });
        }
        await ImageProduct.deleteMany({ product_id: id });
        await EventProduct.deleteMany({ product_id: id });
        req.flash('message', 'Xóa thành công.');
        res.redirect('/admin/product');
    } catch (e) {
        console.log(e);
        res.status(400);
    }
}

module.exports = {
    index,
    create,
    store,
    edit,
    update,
    show,
    destroy,
};
const Brand = require('../../models/Brand');

const index = async(req, res) => {
    try {
        const brands = await Brand.find(); 
        res.render('admin/brand/index', { brands: brands, title: 'Brand manager' });
    } catch (error) {
        console.error('Error retrieving types:', error);
        res.status(500).send('Internal Server Error');
    }
}

const create = (req,res) => {
    res.render('admin/brand/create', { title: 'Add Brand'});
}

const store = async(req, res) => {
    try {
        const { name, location, description } = req.body;
        if (!name) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required.'
            });
        }
        const createBrand = await Brand.create({
            name: name,
            location: location,
            description: description
        });
        res.redirect('/admin/brand');
    } catch (e) {
        console.log(e);
        res.redirect('/admin/brand');
    }
}

module.exports = {
    index,
    create,
    store
};
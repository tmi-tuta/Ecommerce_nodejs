const Attribute = require('../../models/Attribute');

const index = async(req, res) => {
    try {
        const attributes = await Attribute.find(); 
        res.render('admin/attribute/index', { attributes: attributes, title: 'Attribute manager' });
    } catch (error) {
        console.error('Error retrieving types:', error);
        res.status(500).send('Internal Server Error');
    }
}

const create = (req,res) => {
    res.render('admin/attribute/create', { title: 'Add Attribute'});
}

const store = async(req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required.'
            });
        }
        if (!description) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required.'
            });
        }
        const createAttribute = await Attribute.create({
            name: name,
            description: description
        });
        res.redirect('/admin/attribute');
    } catch (e) {
        console.log(e);
        res.redirect('/admin/attribute');
    }
}

module.exports = {
    index,
    create,
    store
};
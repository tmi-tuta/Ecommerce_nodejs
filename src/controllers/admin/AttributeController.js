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

const edit = async(req,res) => {
    id = req.params.id;
    const attribute = await Attribute.findOne({ _id: id })
    res.render('admin/attribute/edit', { title: 'Edit Attribute', attribute: attribute});
}

const update = async(req, res) => {
    try {
        const { name, description } = req.body;
        const id = req.params.id;
        if (!name) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The input is required.'
            });
        }
        const updateAttribute = await Attribute.findByIdAndUpdate(id, { name, description }, { new: true });
        res.redirect('/admin/attribute');
    } catch (e) {
        console.log(e);
        res.status(400);
    }
}

const destroy = async(req, res) => {
    try {
        const id = req.params.id;
        const attribute = await Attribute.findByIdAndDelete(id);
        if (!attribute) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Attribute not found.'
            });
        }
        res.redirect('/admin/attribute');
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
    destroy
};
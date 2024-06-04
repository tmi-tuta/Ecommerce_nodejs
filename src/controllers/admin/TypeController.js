const Type = require('../../models/Type');

const index = async(req, res) => {
    try {
        const types = await Type.find(); 
        res.render('admin/type/index', { types: types, title: 'Type manager' });
    } catch (error) {
        console.error('Error retrieving types:', error);
        res.status(500).send('Internal Server Error');
    }
}

const create = (req,res) => {
    res.render('admin/type/create', { title: 'Add Type'});
}

const store = async(req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required.'
            });
        }
        const createType = await Type.create({
            name: name,
        });
        res.redirect('/admin/type');
    } catch (e) {
        log.error('add type error: '+ e);
    }
}

module.exports = {
    index,
    create,
    store
};
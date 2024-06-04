const Role = require('../../models/Role');

const index = async(req, res) => {
    try {
        const roles = await Role.find(); 
        res.render('admin/role/index', { roles: roles, title: 'Staff manager' });
    } catch (error) {
        console.error('Error retrieving roles:', error);
        res.status(500).send('Internal Server Error');
    }
}

const create = (req,res) => {
    res.render('admin/role/create', { title: 'Add Role'});
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
        const createRole = await Role.create({
            name: name,
        });
        // req.flash('message', 'Add new role success!');
        res.redirect('/admin/role');
    } catch (e) {

    }
}

module.exports = {
    index,
    create,
    store
};
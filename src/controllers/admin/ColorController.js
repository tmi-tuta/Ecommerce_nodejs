const Color = require('../../models/Color');

const index = async(req, res) => {
    try {
        const colors = await Color.find(); 
        res.render('admin/color/index', { colors: colors, title: 'Color manager' });
    } catch (error) {
        console.error('Error retrieving colors:', error);
        res.status(500).send('Internal Server Error');
    }
}

const create = (req,res) => {
    res.render('admin/color/create', { title: 'Add Color'});
}

const store = async(req, res) => {
    try {
        const { name, color, description } = req.body;
        if (!name) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required.'
            });
        }
        const createColor = await Color.create({
            name: name,
            color: color,
            description: description
        });
        res.redirect('/admin/color');
    } catch (e) {
        console.log(e);
        res.redirect('/admin/color');
    }
}

module.exports = {
    index,
    create,
    store
};
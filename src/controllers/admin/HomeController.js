const index = (req, res) => {
    if (req.isAuthenticated()) {
        const userLogged = req.user;        
        res.render('admin/home/index', {
            title: 'Trang quản lí', 
            userLogged: userLogged,
            message: req.flash('message'),
        });
    } else {
        res.redirect('/admin/login');
    }
}

module.exports = {
    index
};
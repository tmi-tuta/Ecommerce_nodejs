const index = (req, res) => {
    if (req.isAuthenticated()) {
        const userLogged = req.user;        
        res.render('admin/home/index', {
            title: 'Home', 
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
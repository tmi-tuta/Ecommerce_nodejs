const index = (req, res) => {
    if (req.isAuthenticated()) {
        const userLogged = req.user;        
        res.render('admin/home/index', {title: 'Home', userLogged: userLogged});
    } else {
        res.redirect('/admin/login');
    }
}

module.exports = {
    index
};
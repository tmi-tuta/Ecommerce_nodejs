const index = (req, res) => {
    const userLogged = req.user;        
    res.render('client/home/index', {title: 'Home', userLogged: userLogged, layout: 'client/layout/main' });
}

module.exports = {
    index
};
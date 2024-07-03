const ClientRouter = require('../routes/client');
const AdminRouter = require('../routes/admin');
const CartRouter = require('../routes/cart');

const routes = (app) => {
    app.use('/', ClientRouter),
    app.use('/admin', AdminRouter),
    app.use('/cart', CartRouter)
}

module.exports = routes;
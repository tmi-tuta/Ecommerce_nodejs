const ClientRouter = require('../routes/client');
const AdminRouter = require('../routes/admin');

const routes = (app) => {
    app.use('/', ClientRouter),
    app.use('/admin', AdminRouter)
}

module.exports = routes;
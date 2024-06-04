const UserRouter = require('../routes/user');
const AdminRouter = require('../routes/admin');

const routes = (app) => {
    app.use('/api/user', UserRouter),
    app.use('/admin', AdminRouter)
}

module.exports = routes;
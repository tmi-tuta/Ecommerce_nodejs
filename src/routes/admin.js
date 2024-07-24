const express = require("express");
const router = express.Router();
const HomeController = require('../controllers/admin/HomeController');
const RegisterController = require('../controllers/admin/auth/RegisterController');
const LoginController = require('../controllers/admin/auth/LoginController');
const RoleController = require('../controllers/admin/RoleController');
const StaffController = require('../controllers/admin/StaffController');
const CustomerController = require('../controllers/admin/CustomerController');
const TypeController = require('../controllers/admin/TypeController');
const BrandController = require('../controllers/admin/BrandController');
const ColorController = require('../controllers/admin/ColorController');
const AttributeController = require('../controllers/admin/AttributeController');
const ProductController = require('../controllers/admin/ProductController');
const EventController = require('../controllers/admin/EventController');
const BannerController = require('../controllers/admin/BannerController');
const EventProductController = require('../controllers/admin/EventProductController');
const WarehouseController = require('../controllers/admin/WarehouseController');
const OrderController = require('../controllers/admin/OrderController');
const StatisticController = require('../controllers/admin/StatisticController');
const { ensureAuthenticatedAdmin } = require('../Middleware/auth');
const passport = require('passport');
const upload = require('../../src/Middleware/upload');

router.get('/', HomeController.index);
router.get('/register', RegisterController.create);
router.post('/register', RegisterController.store);

router.get('/login', (req, res) => {
    res.render('admin/auth/login', { title: 'Login', layout: 'admin/layout/auth' });
});
// router.post('/login', LoginController.login);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/admin/login',
    failureFlash: true
}));
router.get('/logout', ensureAuthenticatedAdmin, LoginController.logout);

router.get('/staff', ensureAuthenticatedAdmin, StaffController.index);
router.get('/customers', ensureAuthenticatedAdmin, CustomerController.index);

router.get('/role', ensureAuthenticatedAdmin, RoleController.index);
router.get('/role/create', ensureAuthenticatedAdmin, RoleController.create);
router.post('/role/store', ensureAuthenticatedAdmin, RoleController.store);
router.get('/role/:id/edit', ensureAuthenticatedAdmin, RoleController.edit);
router.post('/role/:id/update', ensureAuthenticatedAdmin, RoleController.update);
router.get('/role/:id/delete', ensureAuthenticatedAdmin, RoleController.destroy);

router.get('/type', ensureAuthenticatedAdmin, TypeController.index);
router.get('/type/create', ensureAuthenticatedAdmin, TypeController.create);
router.post('/type/store', ensureAuthenticatedAdmin, TypeController.store);
router.get('/type/:id/edit', ensureAuthenticatedAdmin, TypeController.edit);
router.post('/type/:id/update', ensureAuthenticatedAdmin, TypeController.update);
router.get('/type/:id/delete', ensureAuthenticatedAdmin, TypeController.destroy);

router.get('/brand', ensureAuthenticatedAdmin, BrandController.index);
router.get('/brand/create', ensureAuthenticatedAdmin, BrandController.create);
router.post('/brand/store', ensureAuthenticatedAdmin, BrandController.store);
router.get('/brand/:id/edit', ensureAuthenticatedAdmin, BrandController.edit);
router.post('/brand/:id/update', ensureAuthenticatedAdmin, BrandController.update);
router.get('/brand/:id/delete', ensureAuthenticatedAdmin, BrandController.destroy);

router.get('/color', ensureAuthenticatedAdmin, ColorController.index);
router.get('/color/create', ensureAuthenticatedAdmin, ColorController.create);
router.post('/color/store', ensureAuthenticatedAdmin, ColorController.store);
router.get('/color/:id/edit', ensureAuthenticatedAdmin, ColorController.edit);
router.post('/color/:id/update', ensureAuthenticatedAdmin, ColorController.update);
router.get('/color/:id/delete', ensureAuthenticatedAdmin, ColorController.destroy);

router.get('/attribute', ensureAuthenticatedAdmin,AttributeController.index);
router.get('/attribute/create', ensureAuthenticatedAdmin, AttributeController.create);
router.post('/attribute/store', ensureAuthenticatedAdmin, AttributeController.store);
router.get('/attribute/:id/edit', ensureAuthenticatedAdmin, AttributeController.edit);
router.post('/attribute/:id/update', ensureAuthenticatedAdmin, AttributeController.update);
router.get('/attribute/:id/delete', ensureAuthenticatedAdmin, AttributeController.destroy);

router.get('/product', ensureAuthenticatedAdmin, ProductController.index);
router.get('/product/create', ensureAuthenticatedAdmin, ProductController.create);
router.post('/product/store', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'sub_image', maxCount: 10 }]), ProductController.store);
router.get('/product/:id/edit', ensureAuthenticatedAdmin, ProductController.edit);
router.post('/product/:id/update', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'sub_image', maxCount: 10 }]), ProductController.update);
router.get('/product/show/:id', ensureAuthenticatedAdmin, ProductController.show);
router.get('/product/:id/delete', ensureAuthenticatedAdmin, ProductController.destroy);

router.get('/event', ensureAuthenticatedAdmin, EventController.index);
router.get('/event/create', ensureAuthenticatedAdmin, EventController.create);
router.post('/event/store', upload.single('image'), EventController.store);
router.get('/event/:id/edit', ensureAuthenticatedAdmin, EventController.edit);
router.post('/event/:id/update', ensureAuthenticatedAdmin, upload.single('image'), EventController.update);
router.get('/event/:id/delete', ensureAuthenticatedAdmin, EventController.destroy);

router.get('/banner', ensureAuthenticatedAdmin, BannerController.index);
router.get('/banner/create', ensureAuthenticatedAdmin, BannerController.create);
router.post('/banner/store', upload.single('image'), BannerController.store);
router.get('/banner/:id/edit', ensureAuthenticatedAdmin, BannerController.edit);
router.post('/banner/:id/update', ensureAuthenticatedAdmin, upload.single('image'), BannerController.update);
router.get('/banner/:id/delete', ensureAuthenticatedAdmin, BannerController.destroy);

router.get('/event_product/create', ensureAuthenticatedAdmin, EventProductController.create);
router.post('/event_product/store', ensureAuthenticatedAdmin, EventProductController.store);

router.get('/warehouse', ensureAuthenticatedAdmin, WarehouseController.index);
router.get('/warehouse/create', ensureAuthenticatedAdmin, WarehouseController.create)
router.post('/warehouse/store', ensureAuthenticatedAdmin, WarehouseController.store)
router.get('/warehouse/show/:id', ensureAuthenticatedAdmin, WarehouseController.show);
router.post('/warehouse/import/:id', ensureAuthenticatedAdmin, WarehouseController.inport);

router.get('/order', ensureAuthenticatedAdmin, OrderController.index);
router.post('/order/:id/status', ensureAuthenticatedAdmin, OrderController.updateStatus);

router.get('/sales-statistics', StatisticController.getSalesStatistics);

module.exports = router


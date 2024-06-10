const express = require("express");
const router = express.Router();
const HomeController = require('../controllers/admin/HomeController');
const RegisterController = require('../controllers/admin/auth/RegisterController');
const LoginController = require('../controllers/admin/auth/LoginController');
const RoleController = require('../controllers/admin/RoleController');
const StaffController = require('../controllers/admin/StaffController');
const TypeController = require('../controllers/admin/TypeController');
const BrandController = require('../controllers/admin/BrandController');
const ColorController = require('../controllers/admin/ColorController');
const AttributeController = require('../controllers/admin/AttributeController');
const ProductController = require('../controllers/admin/ProductController');
const passport = require('passport');
const upload = require('../../src/Middleware/upload');

router.get('/', HomeController.index);
router.get('/register', (req, res) => {
    res.render('admin/auth/register', { title: 'Register' });
});

router.post('/register', RegisterController.store);
router.get('/login', (req, res) => {
    res.render('admin/auth/login', { title: 'Login'});
});
// router.post('/login', LoginController.login);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/admin/login',
    failureFlash: true
}));
router.get('/logout', LoginController.logout);

router.get('/staff', StaffController.index);

router.get('/role', RoleController.index);
router.get('/role/create', RoleController.create);
router.post('/role/store', RoleController.store);

router.get('/type', TypeController.index);
router.get('/type/create', TypeController.create);
router.post('/type/store', TypeController.store);

router.get('/brand', BrandController.index);
router.get('/brand/create', BrandController.create);
router.post('/brand/store', BrandController.store);

router.get('/color', ColorController.index);
router.get('/color/create', ColorController.create);
router.post('/color/store', ColorController.store);

router.get('/attribute', AttributeController.index);
router.get('/attribute/create', AttributeController.create);
router.post('/attribute/store', AttributeController.store);

router.get('/product', ProductController.index);
router.get('/product/create', ProductController.create);
router.post('/product/store', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'sub_image', maxCount: 10 }]), ProductController.store);
router.get('/product/show/:id', ProductController.show);

module.exports = router


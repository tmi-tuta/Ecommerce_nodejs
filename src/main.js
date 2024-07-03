const express = require("express");
const path = require('path');
const dotenv = require("dotenv");
const dbConnect = require("./mongo");
const routes = require("./routes");
const bodyParser = require("body-parser");
const exPressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require('passport');
const { formatCurrency, formatNewCurrency, formatDateTime } = require('./helper/fomart');
const Cart = require('./models/Cart');
// const LocalStrategy = require('passport-local').Strategy;
// const config_Passport = require('./config/passport');
// const cookieParser = require('cookie-parser');
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
app.use(express.static(path.join(__dirname, 'public'))); 

dbConnect();
    
// nhan request tu body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(exPressLayouts);
app.set('layout', './admin/layout/main.ejs');
app.use(session({
    secret: 'test',
    resave: false,
    saveUninitialized: false,
}));
// Khởi tạo passport
app.use(passport.initialize());
app.use(passport.session());

// cau hinh su dung connect flash
app.use(flash());

app.use((req, res, next) => {
    res.locals.isLoggedIn = req.isAuthenticated();
    res.locals.formatCurrency = formatCurrency;
    res.locals.formatNewCurrency = formatNewCurrency;
    res.locals.formatDateTime = formatDateTime;
    if (req.user) {
        res.locals.userLogged = req.user;
    } else {
        res.locals.userLogged = null;
    }
    next();
}); 

app.use((req, res, next) => {
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    req.session.cart = cart;
    res.locals.session = req.session;
    next();
});

routes(app);

app.listen(port, ()=> {
    console.log('Server is running in port: ', + port);
});

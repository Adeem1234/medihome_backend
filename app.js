const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const passport = require('passport');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
// const socketio = require('socket.io');

//config command to use the dotenv
require('dotenv').config();

// DataBase Call
const connection = require('./utils/db');

const app = express();
const PORT = 5000 || process.env.PORT;
const expressSession = require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
});

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// passport Config
require('./config/passport')(passport);

// Middlewares
app.use(cors());
app.options('*', cors);
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('view cache', false);
app.use(fileUpload());
app.use(expressSession);
app.use(express.static(path.join(__dirname, 'public')));

//
// Middleware fro using cross-orgin data transfer
app.use((req, res, next) => {
    res.header(
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Origin',
        process.env.BASE_URL,
        'X-Requested-With',
        'Content-Type',
        'Accept'
    );
    next();
});

// passport Middlewares
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

// Global Variable for message 
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Route Middlewares
app.use('/api', require('./routes/api'));
app.use('/', require('./routes/index'));
app.use('/admin', require('./routes/web'));


// Page Not Found Handler
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Not Found'
    });
});


module.exports = app;
const express = require('express');
const req = require('express/lib/request');
const app = express();
const path = require('path');
const morgan = require('morgan')

// Setting 
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs' );

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

// Routes
app.use(require('./routes/index'));

// Static
app.use(express.static(path.join(__dirname, 'public')));


// 404 handler
app.use((req, res, next) => {
    res.status(404).redirect('./views/404.ejs');
})


module.exports = app;
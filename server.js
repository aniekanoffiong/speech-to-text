'use strict'

// Requiring all Dependencies
const express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    config = require('./config/'),
    path = require('path');

// App
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Enabling CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
    );
    next();
});

// Routes
app.use('/api', require('./routes/'));
app.use('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// App Listen
app.listen(config.port, function() {
    console.log('App Started on Port ', config.port);
});
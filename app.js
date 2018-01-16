var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var configDB = require('./db_connection/db.js');
var page = require('./models/page.js');

//connect to db
mongoose.connect(configDB.database);
var db = mongoose.connection;

//validate connection
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('connected to mongodb');
});

//Init app
var app = express();

//JSON
app.set('json spaces', 40);

//body parser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//set up the request type
app.use((req, res, next) => {
    //website to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    //request type allowed
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    //headers allowed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-with,Content-type');
    //allow if using session or cookie
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//set routes
var pages = require('./routes/pages.js');
var users = require('./routes/users.js');

app.use('/pages', pages);
app.use('/users', users);

//start server
app.listen('3000', () => {
    console.log('server running at port 3000');
});
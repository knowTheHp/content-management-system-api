var express = require('express');
var router = express.Router();

//get user model
var User = require('../models/user');

//register user
router.post('/register', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    //validate username and insert
    User.findOne({
        username: username
    }, (err, user) => {
        if (user) {
            res.json('userExists');
        } else {
            var user = new User({
                username: username,
                password: password
            });

            user.save((err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json('userAdded');
                }
            });
        }
    });
});

//login user
router.post('/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    //validate credentials
    User.findOne({
        username: username,
        password: password
    }, (err, user) => {
        if (err) console.log(err);

        if (user) {
            res.json(username);
        } else {
            res.json('invalidLogin');
        }
    });
});

module.exports = router;
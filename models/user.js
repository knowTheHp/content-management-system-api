var mongoose = require('mongoose');

var user = mongoose.model('Users', {
    username: {
        type: String,
        required: 'username required',
        unique: true
    },
    password: {
        type: String,
        required: 'password required'
    }
});

var User = module.exports = user;
var mongoose = require('mongoose');

//page
var page = mongoose.model('Page', {
    title: {
        type: String,
        demand: true,
        minlength: 3,
        required: 'title field is required'
    },
    slug: {
        type: String,
        demand: true,
        unique: true
    },
    content: {
        type: String,
        demand: true,
        required: 'content is required'
    },
    sidebar: {
        type: String
    }
});

var Page = module.exports = page;
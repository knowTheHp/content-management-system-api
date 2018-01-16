var express = require('express');
var router = express.Router();

//get page model
var Page = require('../models/page');

//get all pages
router.get('/', (req, res) => {
    Page.find({}, (err, pages) => {
        if (err) console.log(err);
        res.json(pages);
    });
});

//get a specific page
router.get('/:slug', (req, res) => {
    var slug = req.params.slug;
    Page.findOne({
        slug: slug
    }, (err, page) => {
        if (err) console.log(err);
        res.json(page);
    });
})


//add page
router.post('/add-page', (req, res) => {
    var title = req.body.title;
    var slug = req.body.title.replace(/\s+g/, '-').toLowerCase();
    var content = req.body.content;

    //validate page and insert
    Page.findOne({
        title: title
    }, (err, page) => {
        if (page) {
            res.json('pageExists');
        } else {
            var page = new Page({
                title: title,
                slug: slug,
                content: content,
                sidebar: "no"
            });

            page.save((err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json('ok');
                }
            });
        }
    });
});

//edit page
router.get('/edit-page/:id', (req, res) => {
    var id = req.params.id;
    Page.findById(id, (err, page) => {
        if (err) console.log(err);
        res.json(page);
    });
});

//update page
router.post('/edit-page/:id', (req, res) => {
    var id = req.params.id;
    var title = req.body.title;
    var slug = req.body.title.replace(/\s+g/, '-').toLowerCase();
    var content = req.body.content;

    //validate page and insert
    Page.findById(id, (err, page) => {
        if (page.slug === slug && page._id != id) {
            res.json('pageExists');
        } else {
            page.title = title;
            page.slug = slug;
            page.content = content;
            page.sidebar = "no";

            page.save(err => {
                if (err) {
                    res.json('problem');
                    console.log(err);
                } else {
                    res.json('ok');
                }
            });
        }
    });
});

//delete page
router.get('/delete-page/:id', (req, res) => {
    var id = req.params.id;
    Page.findByIdAndRemove(id, (err, page) => {
        if (err) {
            console.log(err)
            res.json('error');
        }
        res.json('ok');
    });
});



module.exports = router;
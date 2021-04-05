// GROUP (K)  AHMAD FAWAD & Reza Danish 
//--------CREATE-UPDATE-DELETE-READ---
//--------Server-side--Rendering--with--PUG
var Post = require('./models/post.js');
const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');
/** ----methodOverride----
 * This external module is used to change HTTP verbs of 
 * the requests comming from a browser which 
 * is only capable of sending POST and GET requests.
 * refer to the documentation on npm to get insights on how this module works
 */

router.use(express.urlencoded({ extended: true }));
router.use(methodOverride('_method'));


// CREATE route
router
    .post('/post', async (req, res) => {
        const post = await Post.create(req.body);
        res.status(201).render('getone', { post });
    })
    .get('/post/create', (req, res) => {
        res.status(200).render('createform');
    });

// UPDATE route
router
    .put('/post/:postid', async (req, res) => {
        const post = await Post.findByIdAndUpdate(req.params.postid, req.body, { new: true });
        if (post) {
            res.status(200).render('getone', { post });
        } else {
            res.status(201).json({
                Error: 'Ops... Something went wrong. Unable to update the post!'
            })
        }
    })
    .get('/post/update/:postid', async (req, res) => {
        const post = await Post.findById(req.params.postid);
        post.date = post.date.toISOString().split('T')[0];
        res.status(200).render('updateform', { post });
    });

// DELETE route
router.delete('/post/delete/:postid', async (req, res) => {
    const post = await Post.findByIdAndDelete(req.params.postid);
    if (post) {
        res.redirect('/assignment/post');
    }
    else {
        res.status(201).json({
            Error: 'Ops... Something went wrong. Unable to update the post!'
        })
    }
});

// READ ALL POSTS
router.get('/post', async (req, res) => {
    const posts = await Post.find(req.query);

    res.status(200).render('getall', { posts });
});

// READ SPECIFI POST
router.get('/post/:postid', async (req, res) => {
    const post = await Post.findById(req.params.postid);
    res.status(200).render('getone', { post });
});

module.exports = router;
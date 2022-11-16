const Post = require("../../models/Post");
const { post } = require("./userRoutes");
const router = require('express').Router();

module.expoorts = (app) => {
    // CREATE
    app.post('/post', (req,res) => {
        // Instantiate instance of post model
        const post = new post(req.body);
        // Save instance of post model to db and redirect to the root
        post.save(() => res.redirect('/'));
    });
    //Look up the post
    Post
    .findById(req.params.id).lean().populate('comments')
    .then((post) => res.render('post-show', {post}))
    .catch((err) => {
        console.log(err.message);
      })};
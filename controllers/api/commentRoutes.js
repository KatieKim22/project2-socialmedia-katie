const Comment = require ('../models/comment.js');
const router = require('express').Router();

    // CREATE Commment
app.post('/posts/:postId/comments', (req, res) => {
    // INSTATIATE INSTANCE OF MODEL
    const comment = new Comment(req.body);

    // SAVE INSTANCE OF Comment MODEL TO DB
    comment
        .save()
        //REDIRECT TO THE ROOT
        .then(() => res.redirect('/'))
        .catch((err) => {
            console.log(err);
        });
});
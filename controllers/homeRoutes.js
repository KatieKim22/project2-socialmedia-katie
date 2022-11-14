const router = require('express').Router();

const { Profile, User, Status } = require('../models');

// GET home page

router.get('/', (req, res) => {
    res.render('home', { text: "Welcome to myFace" })
});

router.post('/submit', function (req, res, next) {
    // check validity
    req.check('email', 'Invalid email address').isEmail();
    req.check('password', 'Password is invalid').isLength({ min: 4 });

    var errors = req.validationErrors();
    if (errors) {
        req.session.errors = errors;
        req.session.success = false;
    } else {
        req.session.success = true;
    }
    res.redirect('/');
})

module.exports = router;

// { title: 'Form Validation', success: req.session.success, errors: req.session.errors });
// req.session.errors = null;
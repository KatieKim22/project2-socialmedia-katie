// user routes - for login, log-out, register
const router = require('express').Router();
const bcrypt = require("bcrypt");
// assign variables with models
const { User, Status } = require('../../models');

// for register
router.post('/register', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
        res.render('/profile')
    } catch (err) {
        res.status(400).json(err)
    }
});

// check validity
router.post('/register', function (req, res, next) {

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

// login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res
                .status(400)
                .json({ message: "Please try again" });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.checkPassword);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: "Please try again" });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: " Now you're logged in!" })
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        }
        )
    } else {
        res.status(404).end()
    }
});

module.exports = router;
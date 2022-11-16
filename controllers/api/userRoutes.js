// user routes - for login, log-out, register
const router = require('express').Router();
const bcrypt = require("bcrypt");
const { RuleTester } = require('eslint');
// assign variables with models
const { User, Status } = require('../../models');

// for register



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
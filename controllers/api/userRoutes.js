// user routes - for login, log-out, register
const router = require('express').Router();
const bcrypt = require("bcrypt");

// assign variables with models
const { User } = require('../../models');





// login
router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    try {
        const userData = await User.findOne({ where: { email: email } });

        if (!userData) {
            return res
                .status(400)
                .send("Cannot find user");
        }

        const validPassword = await bcrypt.compare(password, userData.password);

        if (!validPassword) {
            return res
                .status(400)
                .send("Please try again");
        } else {

            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.logged_in = true;

                return res.redirect('/profile')
            })
        };
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    try {
        if (req.session.logged_in) {
            req.session.destroy(() => {
                res.redirect('home')
            }
            )
        } else {
            res.status(404).end()
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

module.exports = router;
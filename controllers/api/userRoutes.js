// user routes - for login, log-out, register
const router = require('express').Router();
const bcrypt = require("bcrypt");
const { RuleTester } = require('eslint');
// assign variables with models
const { User, Status } = require('../../models');

// for register
router.post('/register', async (req, res) => {
    console.log(req.body);

    const { first_name, last_name, email, password, psw_repeat } = req.body;

    db.query('SELECT email FROM user WHERE email?', [email], async (err, result) => {
        if (err) {
            console.log(err);
        }

        if (result.length > 0) {
            return res.render('register', {
                message: 'That email is already in use'
            })
        } else if (password !== psw_repeat) {
            return res.render('register', {
                message: 'Password do not match'
            })
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO user SET ?', { firstName: first_name, lastName: last_name, email: email, password: hashedPassword }, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result)
                return res.render('register', {
                    message: 'User registered'
                })
            }
        })
    });

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
// user routes - for login, log-out, register
const router = require('express').Router();
const bcrypt = require("bcrypt");

const { RuleTester } = require('eslint');
// assign variables with models
const { User } = require('../../models');

let checkInput = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { first_name, last_name, email, password, psw_repeat } = req.body;

            let checkDup = await User.findOne({
                where: {
                    email: email
                }
            })
            if (checkDup) {
                resolve(false)
                return res.render('registerForm', {
                    message: 'That email is already in use'
                })
            } else if (password !== psw_repeat) {
                return res.render('registerForm', {
                    message: 'Password do not match'
                })
            } else {
                resolve(true)
            }
        } catch (err) {
            console.log(err)
            reject(err)
        }
    })
}

// 5000/api/auth/register?
router.post('/register', async (req, res) => {
    console.log(req.body);
    try {

        let inputlookgood = await checkInput(user)
        if (inputlookgood) {
            const { first_name, last_name, email, password, psw_repeat } = req.body;


            let hashedPassword = bcrypt.hash(password, 8);
            console.log(hashedPassword);

            User.create({ firstName: first_name, lastName: last_name, email: email, password: hashedPassword }), (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result)
                    return res.render('profile/:id', {
                        message: 'User registered'
                    })
                }
            }
        } else {
            return res.render('registerForm')
        }

    } catch (err) {

    }
})




module.exports = router;
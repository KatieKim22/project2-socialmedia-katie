// user routes - for login, log-out, register
const router = require('express').Router();
const bcrypt = require("bcrypt");

// assign variables with models
const { User } = require('../../models');

let checkInput = async (req, res) => {
    const { email, password, psw_repeat } = req.body;
    return new Promise(async (resolve, reject) => {
        try {
            let checkDup = await User.findOne({
                where: {
                    email: email
                }
            })
            console.log("work please!!!!", checkDup)
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
                return resolve(true)
            }
        } catch (err) {
            console.log(err)
            reject(err)
        }
    })
}

// 5000/api/auth/register?
router.post('/register', async (req, res) => {
    console.log("Hello Hello", req.body);
    const { first_name, last_name, email, password, psw_repeat } = req.body;
    try {

        let inputlookgood = await checkInput(req, res)
        console.log("Pleaseeeeee")
        if (inputlookgood) {

            let hashedPassword = bcrypt.hash(password, 8);
            console.log(hashedPassword);

            const createNewUser = await User.create({ firstName: first_name, lastName: last_name, email: email, password: hashedPassword })
            if (err) {
                console.log(err);
            } else {
                console.log(result)
                res.status(201).json(createNewUser)
            }
        } else {
            return res.render('registerForm')
        }

    } catch (err) {
        console.log(err)
        res.status(400).json({ message: err.message })
    }
})




module.exports = router;
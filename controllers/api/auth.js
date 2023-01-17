// user routes - for login, log-out, register
const router = require('express').Router();
const bcrypt = require("bcrypt");

// assign variables with models
const { User } = require('../../models');

// 5000/register
router.post('/register', async (req, res) => {
    console.log("Hello Hello", req.body);
    const { firstName, lastName, email, password } = req.body;
    try {


        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        const createNewUser = await User.create({ firstName: firstName, lastName: lastName, email: email, password: hashedPassword })
        return res.redirect('/profile')

    } catch (err) {
        console.log(err)
        res.status(400).json({ message: err.message })
    }
})




module.exports = router;
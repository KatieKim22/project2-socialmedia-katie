const router = require('express').Router();

const { Profile, User, Status } = require('../models');

// GET home page

router.get('/', (req, res) => {
    res.render('home', { text: "Welcome to myFace" })
});

router.get('/login', async (req, res) => {
    res.render("loginForm")
});

router.get('/register', async (req, res) => {
    res.render("registerForm")
})

router.get('/profile', async (req, res) => {
    // render status posts

    const status = await Status.findAll()
    // let loggedUser = await User.findOne({
    //     where: { userName: req.body.userName }
    // })
    console.log(status)
    return res.render('profile', { status: status })

})

router.get('/post', async (req, res) => {
    res.render("post")
})

module.exports = router;


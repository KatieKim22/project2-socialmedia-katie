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

module.exports = router;


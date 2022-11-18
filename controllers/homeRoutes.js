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

router.get('/profile/', async (req, res) => {
    res.render("profile")
})

router.get('/post', async (req, res) => {
    res.render("post")
})

module.exports = router;


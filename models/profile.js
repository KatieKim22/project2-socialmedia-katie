const express = require("express");


const schema = express.Schema({
    name: String,
    email: String,
    pass: String,
    about: String,
    location: String,
    phone: String,
    sex: String,
    age: String,
    imgurl: String,
    state: [{ postid: String,method: String }]
})

module.exports = profile;
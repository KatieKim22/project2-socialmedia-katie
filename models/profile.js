const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Profile extends Model { }

Profile.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
        },
        userNickname: {
            type: DataTypes.STRING,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: true,
        modelName: 'profile',
    }
)

module.exports = Profile;


// const express = require("express");


// const schema = express.Schema({
//     name: String,
//     email: String,
//     pass: String,
//     about: String,
//     location: String,
//     phone: String,
//     sex: String,
//     age: String,
//     imgurl: String,
//     state: [{ postid: String, method: String }]
// })


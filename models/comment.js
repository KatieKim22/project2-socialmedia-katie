const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { schema } = require('./User');

const commetSchema = new schema({
    content: { type: String, required: true},},
    {timestamps: true});

    module.exports = model('Comment', commentSchema);
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { schema } = require('./User');


const postSchema = new Schema ({
    status: {type: String, required: true}
});

module.exports = model('Post', postSchema)
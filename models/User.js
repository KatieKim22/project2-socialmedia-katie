const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')

class User extends Model {}

User.init(
    {
        first: {
            type: DataTypes.STRING
        },
        last: {
            type: DataTypes.STRING
        },
        user: {
            type: DataTypes.STRING
        },
        pass: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        location: {
            type:DataTypes.STRING
        }
    },
    {
        sequelize,
        timestanp: false,
        underscored: true,
    }
);

module.exports = Book;
const User = require('./User');
const Profile = require('./Profile');
const Status = require('./Status');

Profile.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Status, {
    foreignKey: 'user_id',
    onDelete: "CASCADE"
});

Profile.hasMany(Status, {
    foreignKey: 'user_id',
    onDelete: "CASCADE"
})

module.exports = { Profile, User, Status };
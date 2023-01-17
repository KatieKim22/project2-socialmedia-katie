const User = require('./User');
const Status = require('./Status');

Status.belongsTo(User, {
    foreignKey: 'user_id'
})

User.hasMany(Status, {
    foreignKey: 'user_id',
    onDelete: "CASCADE"
});

module.exports = { User, Status };

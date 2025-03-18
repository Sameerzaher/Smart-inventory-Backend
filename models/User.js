const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); // Make sure this path is correct

const User = sequelize.define('User', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password_hash: { type: DataTypes.TEXT, allowNull: false },
    role: { type: DataTypes.ENUM('admin', 'employee'), defaultValue: 'employee' }
});

module.exports = User;

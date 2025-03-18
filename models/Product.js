const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Product = sequelize.define('Product', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    sku: { type: DataTypes.STRING, unique: true, allowNull: false },
    stock_quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
    selling_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    createdAt: { type: DataTypes.DATE, field: 'created_at' },  // Ensure correct column name
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' }   // Ensure correct column name
}, {
    tableName: 'products',
    timestamps: true,
    underscored: true
});

module.exports = Product;

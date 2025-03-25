const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Ensure correct path to your DB connection

const Inventory = sequelize.define("Inventory", {
  product_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stock_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = Inventory;

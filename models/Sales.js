const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Sales = sequelize.define("Sales", {
  product_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity_sold: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date_sold: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Sales;

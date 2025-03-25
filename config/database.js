const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("inventory_db", "postgres", "sameer@lab", {
  host: "localhost",
  dialect: "postgres", // or 'mysql' depending on your DB
  logging: false, // Disable logs
});

module.exports = sequelize;

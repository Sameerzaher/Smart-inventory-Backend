//Compare this snippet from models/Sale.js:
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Sale = sequelize.define('Sale', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },  
    product_id: { type: DataTypes.UUID, allowNull: false },
    quantity_sold: { type: DataTypes.INTEGER, allowNull: false },
    total_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
});

module.exports = Sale;
// Compare this snippet from routes/auth.js:
// const express = require('express'); 
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const { User } = require('../models');
//
// const router = express.Router();
//
// router.post('/register', async (req, res) => {
//     const { name, email, password, role } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     try {
//         await User.create({ name, email, password_hash: hashedPassword, role });
//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         res.status(400).json({ message: 'Error registering user', error });
//     }
// });
//

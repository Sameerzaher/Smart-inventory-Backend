const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');
const inventoryController = require('../controllers/inventoryController');
const salesController = require('../controllers/salesController');
const { authenticateToken } = require('../middleware/authMiddleware');

// 📌 AUTH ROUTES
router.post('/auth/register', authController.registerUser);
router.post('/auth/login', authController.loginUser);

// 📌 PRODUCT ROUTES
router.get('/products', authenticateToken, productController.getProducts);
router.post('/products', authenticateToken, productController.createProduct);
router.put('/products/:id', authenticateToken, productController.updateProduct);
router.delete('/products/:id', authenticateToken, productController.deleteProduct);

// 📌 INVENTORY ROUTES
router.post('/inventory/add', authenticateToken, inventoryController.addStock);
router.post('/inventory/remove', authenticateToken, inventoryController.removeStock);
//router.get('/inventory', authenticateToken, inventoryController.getInventory);

// 📌 SALES ROUTES
router.post('/sales', authenticateToken, salesController.recordSale);
router.get('/sales', authenticateToken, salesController.getSalesReport);

module.exports = router;

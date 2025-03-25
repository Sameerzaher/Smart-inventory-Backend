const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authController = require("../controllers/authController");
const inventoryController = require("../controllers/inventoryController");
const salesController = require("../controllers/salesController");
const { authenticateToken } = require("../middleware/authMiddleware");
const { getProducts, addProduct } = require("../controllers/productController");


// ✅ AUTH ROUTES
router.post("/auth/register", authController.registerUser);
router.post("/auth/login", authController.loginUser);

// ✅ PRODUCT ROUTES

// router.get("/products", authenticateToken, getProducts);
// router.post("/addproducts", authenticateToken, addProduct);
router.get('/products', authenticateToken, productController.getProducts);
router.post('/addproducts', authenticateToken, productController.createProduct);
router.put('/products/:id', authenticateToken, productController.updateProduct);
router.delete('/products/:id', authenticateToken, productController.deleteProduct);

// ✅ INVENTORY ROUTES (NEW)
router.get("/getinventory", authenticateToken, inventoryController.getInventory);
router.post("/inventory/add", authenticateToken, inventoryController.addStock);
router.post("/inventory/remove", authenticateToken, inventoryController.removeStock);

// ✅ SALES ROUTES (NEW)
router.get("/getsales", authenticateToken, salesController.getSalesReport);
router.post("/sales", authenticateToken, salesController.recordSale);

module.exports = router;

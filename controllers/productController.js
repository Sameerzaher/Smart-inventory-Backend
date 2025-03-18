const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

exports.addProduct = async (req, res) => {
    try {
        const { name, sku, stock_quantity, selling_price } = req.body;
        const product = await Product.create({ name, sku, stock_quantity, selling_price });
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: 'Error adding product', error });
    }
};
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        console.log("✅ Products Fetched from DB:", products);  // Debugging Line
        res.json(products);
    } catch (error) {
        console.error("❌ Error fetching products:", error);
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

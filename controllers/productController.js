const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: 'Error creating product', error });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.update(req.body, { where: { id } });
        res.json({ message: 'Product updated successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error updating product', error });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.destroy({ where: { id } });
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting product', error });
    }
};

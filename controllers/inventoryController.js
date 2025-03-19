const Product = require('../models/Product');

exports.addStock = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const product = await Product.findByPk(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        product.stock_quantity += quantity;
        await product.save();

        res.json({ message: 'Stock added successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error updating stock', error });
    }
};

exports.removeStock = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const product = await Product.findByPk(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        if (product.stock_quantity < quantity)
            return res.status(400).json({ message: 'Not enough stock available' });

        product.stock_quantity -= quantity;
        await product.save();

        res.json({ message: 'Stock removed successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error updating stock', error });
    }
};

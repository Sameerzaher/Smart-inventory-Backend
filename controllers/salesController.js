const Sale = require('../models/Sale');
const Product = require('../models/Product');

exports.recordSale = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const product = await Product.findByPk(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        if (product.stock_quantity < quantity)
            return res.status(400).json({ message: 'Not enough stock available' });

        const totalPrice = quantity * product.selling_price;

        const sale = await Sale.create({ productId, quantity_sold: quantity, total_price: totalPrice });
        product.stock_quantity -= quantity;
        await product.save();

        res.json({ message: 'Sale recorded successfully', sale });
    } catch (error) {
        res.status(500).json({ message: 'Error recording sale', error });
    }
};

exports.getSalesReport = async (req, res) => {
    try {
        const sales = await Sale.findAll();
        res.json(sales);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sales report', error });
    }
};

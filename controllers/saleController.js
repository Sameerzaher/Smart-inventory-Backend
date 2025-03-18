const Sale = require('../models/Sale');

exports.getSales = async (req, res) => {
    try {
        const sales = await Sale.findAll();
        res.json(sales);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sales', error });
    }
};

exports.addSale = async (req, res) => {
    try {
        const { product_id, quantity_sold, total_price } = req.body;
        const sale = await Sale.create({ product_id, quantity_sold, total_price });
        res.status(201).json(sale);
    } catch (error) {
        res.status(400).json({ message: 'Error recording sale', error });
    }
};


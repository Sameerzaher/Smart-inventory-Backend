const Sales = require("../models/Sales");
const Product = require("../models/Product");


exports.getSalesReport = async (req, res) => {
  try {
    const sales = await Sales.findAll();
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sales report", error });
  }
};

// ✅ Record Sale
exports.recordSale = async (req, res) => {
  try {
    const { productId, quantity, total_price } = req.body;
    const product = await Product.findByPk(productId);

    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.stock_quantity < quantity)
      return res.status(400).json({ message: "Not enough stock available" });

    product.stock_quantity -= quantity;
    await product.save();

    const sale = await Sales.create({ productId, quantity, total_price });
    res.json({ message: "Sale recorded successfully", sale });
  } catch (error) {
    console.error("Error recording sale:", error);
    res.status(500).json({ message: "Error recording sale", error });
  }
};

// ✅ Get Sales Report
exports.getSalesReport = async (req, res) => {
  try {
    const sales = await Sales.findAll({ include: Product });
    res.json(sales);
  } catch (error) {
    console.error("Error fetching sales report:", error);
    res.status(500).json({ message: "Error fetching sales report", error });
  }
};
// Compare this snippet from models/sale.js:


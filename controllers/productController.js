const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
    try {
      const products = await Product.findAll();
      res.json(products);  // ✅ Ensure returning an array
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Server error", error });
    }
  };


  exports.createProduct = async (req, res) => {
    try {
      const { name, sku, stock_quantity, selling_price } = req.body;
  
      // ✅ Basic Validation
      if (!name || !sku || stock_quantity == null || selling_price == null) {
        return res.status(400).json({
          message: 'Missing required fields: name, sku, stock_quantity, selling_price',
        });
      }
  
      // ✅ Create Product
      const product = await Product.create({
        name,
        sku,
        stock_quantity,
        selling_price,
      });
  
      res.status(201).json(product);
    } catch (error) {
      console.error('❌ Error creating product:', error);
  
      // ✅ Handle unique SKU error
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ message: 'SKU must be unique.' });
      }
  
      res.status(500).json({
        message: 'Error creating product',
        error: error.message || error,
      });
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

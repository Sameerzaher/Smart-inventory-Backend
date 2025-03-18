const express = require('express');
const { getSales, addSale } = require('../controllers/saleController');

const router = express.Router();

router.get('/', getSales);
router.post('/', addSale);

module.exports = router;

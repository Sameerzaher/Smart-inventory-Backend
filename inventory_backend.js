// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const { Sequelize, DataTypes } = require('sequelize');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

// // Initialize Express App
// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // Initialize Database Connection
// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     dialect: 'postgres',
//     logging: false
// });

// // Define Models
// const User = sequelize.define('User', {
//     id: { type: DataTypes.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
//     name: { type: DataTypes.STRING, allowNull: false },
//     email: { type: DataTypes.STRING, unique: true, allowNull: false },
//     password_hash: { type: DataTypes.TEXT, allowNull: false },
//     role: { type: DataTypes.ENUM('admin', 'employee'), defaultValue: 'employee' }
// });

// const Product = sequelize.define('Product', {
//     id: { type: DataTypes.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
//     name: { type: DataTypes.STRING, allowNull: false },
//     sku: { type: DataTypes.STRING, unique: true, allowNull: false },
//     stock_quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
//     selling_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
// });

// const Sale = sequelize.define('Sale', {
//     id: { type: DataTypes.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
//     product_id: { type: DataTypes.UUID, allowNull: false },
//     quantity_sold: { type: DataTypes.INTEGER, allowNull: false },
//     total_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
// });

// // Middleware to verify JWT Token
// const verifyToken = (req, res, next) => {
//     const token = req.headers['authorization'];
//     if (!token) return res.status(403).json({ message: 'No token provided' });

//     jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
//         if (err) return res.status(401).json({ message: 'Unauthorized' });
//         req.userId = decoded.id;
//         next();
//     });
// };

// // User Registration
// app.post('/register', async (req, res) => {
//     const { name, email, password, role } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     try {
//         const user = await User.create({ name, email, password_hash: hashedPassword, role });
//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         res.status(400).json({ message: 'Error registering user', error });
//     }
// });

// // User Login
// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ where: { email } });
//     if (!user || !await bcrypt.compare(password, user.password_hash)) {
//         return res.status(401).json({ message: 'Invalid credentials' });
//     }
//     const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
//     res.json({ token });
// });

// // Define Routes
// app.get('/', (req, res) => {
//     res.send("Inventory Management API is running!");
// });

// // Products Endpoints (Protected)
// app.get('/products', verifyToken, async (req, res) => {
//     const products = await Product.findAll();
//     res.json(products);
// });

// app.post('/products', verifyToken, async (req, res) => {
//     const { name, sku, stock_quantity, selling_price } = req.body;
//     const product = await Product.create({ name, sku, stock_quantity, selling_price });
//     res.status(201).json(product);
// });

// // Sales Endpoints (Protected)
// app.get('/sales', verifyToken, async (req, res) => {
//     const sales = await Sale.findAll();
//     res.json(sales);
// });

// app.post('/sales', verifyToken, async (req, res) => {
//     const { product_id, quantity_sold, total_price } = req.body;
//     const sale = await Sale.create({ product_id, quantity_sold, total_price });
//     res.status(201).json(sale);
// });

// // Sync Database & Start Server
// sequelize.sync().then(() => {
//     app.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${process.env.PORT || 5000}`));
// });


require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./config/database');
const apiRoutes = require('./routes/api');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', apiRoutes);

sequelize.sync().then(() => {
    console.log('✅ Database connected successfully.');
    app.listen(5000, () => console.log('🚀 Server running on port 5000'));
}).catch(err => console.error('❌ Database connection error:', err));

const express = require('express');
const cors = require('cors');
const loginRouter = require('../database/routes/login.routes');
const productsRouter = require('../database/routes/products.routes');
const checkoutRouter = require('../database/routes/checkout.routes');
const ordersRouter = require('../database/routes/orders.routes');
const salesRouter = require('../database/routes/sales.routes');
const managerRouter = require('../database/routes/manager.routes');
const loginMiddleware = require('../database/middleware/login.middleware');
const errorMiddlewere = require('../database/middleware/errorMiddleware');
const registerRouter = require('../database/routes/register.routes');
const sellerRouter = require('../database/routes/seller.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/products', loginMiddleware, productsRouter);
app.use('/customer/checkout', loginMiddleware, checkoutRouter);
app.use('/seller', loginMiddleware, sellerRouter);
app.use('/customer', loginMiddleware, ordersRouter);
app.use('/sale', loginMiddleware, salesRouter);
app.use('/manager', loginMiddleware, managerRouter);
app.use(errorMiddlewere);
app.use('/images', express.static('public'));

module.exports = app;

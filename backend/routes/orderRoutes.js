const express = require('express');
const { createOrder, getOrderById, getUserOrders, updateOrderStatus } = require('../controllers/orderController')
const verifyToken = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', verifyToken, createOrder);
router.get('/:orderId', verifyToken, getOrderById);
router.get('/user/orders', verifyToken, getUserOrders);
router.put('/:orderId', verifyToken, updateOrderStatus);

module.exports = router;
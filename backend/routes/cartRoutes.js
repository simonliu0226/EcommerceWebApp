const express = require('express');
const { getCart, addItemToCart, updateCartItem, removeItemFromCart } = require('../controllers/cartController');
const verifyToken = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', verifyToken, getCart);
router.post('/addItem', verifyToken, addItemToCart);
router.put('/updateItem/:itemId', verifyToken, updateCartItem);
router.delete('/removeItem/:itemId', verifyToken, removeItemFromCart);

module.exports = router;
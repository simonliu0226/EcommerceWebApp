const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get cart for user
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart', error });
    }
};

// Add item to cart
exports.addItemToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const cart = await Cart.findOne({ user: req.user.id });
        const price = product.price;
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            // Product already in cart, update quantity
            cart.items[itemIndex].quantity += quantity;
        } else {
            // Product not in cart, add new item
            cart.items.push({ product: productId, quantity, price });
        }

        cart.modifiedOn = Date.now();
        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Error adding item to cart", error })
    }
};

// Update item in cart
exports.updateCartItem = async (req, res) => {
    const { itemId } = req.params;
    const { quantity } = req.body;
    try {
        const cart = await Cart.findOneAndUpdate(
            { "user": req.user.id, "items.id": itemId },
            { "$set": { "items.$.quantity": quantity }},
            { new: true }
        ).populate('items.product');
        res.josn(cart);
    } catch (error) {
        res.status(500).json({ message: "Error updating cart item", error })
    }
};

// Remove item from cart
exports.removeItemFromCart = async (req, res) => {
    const { itemId } = req.params;
    try {
      const cart = await Cart.findOneAndUpdate(
        { user: req.user.id },
        { $pull: { items: { _id: itemId } }},
        { new: true }
      );
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: "Error removing item from cart", error });
    }
  };
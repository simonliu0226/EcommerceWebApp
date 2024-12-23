const Order = require('../models/Order');

// Create a new order
exports.createOrder = async (req, res) => {
  const { items, total } = req.body; // Assuming items array and total are passed directly
  try {
    const newOrder = new Order({
      user: req.user.id,
      items,
      total
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
};

// Get an order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate('items.product');
    if (!order || order.user.toString() !== req.user.id) {
      res.status(404).json({ message: "Order not found or user mismatch" });
    } else {
      res.json(order);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
};

// Get all orders for a user
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('items.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status, updatedAt: Date.now() },
      { new: true }
    );
    if (!order || order.user.toString() !== req.user.id) {
      res.status(404).json({ message: "Order not found or user mismatch" });
    } else {
      res.json(order);
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error });
  }
};

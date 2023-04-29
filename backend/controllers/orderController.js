const axios = require('axios');
const asyncHandler = require('express-async-handler');
const { getOrderId, setPaymentId } = require('../services/levelDB');
const Order = require('../models/orderModel');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc    Get order by id
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const paymentId = req.body.id;
  const orderId = req.params.id;

  // Check if the payment is already processed before
  if (await getOrderId(paymentId)) {
    return res.status(400).send({error: 'Payment is already processed!'});
  }

  const order = await Order.findById(orderId);

  const clientId = process.env.PAYPAL_CLIENT_ID;
  const secrect = process.env.PAYPAL_SECRET;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    auth: { username: clientId, password: secrect },
  };

  try {
    const { data } = await axios.get(
      `https://api.sandbox.paypal.com/v2/checkout/orders/${paymentId}`,
      config
    );

    if (order && data.status === 'COMPLETED') {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: data.id,
        status: data.status,
        update_time: data.update_time,
        email_address: data.payer.email_address,
      };

      const updatedOrder = await order.save();

      // store payment id and orderid in key-value store
      await setPaymentId(data.id, order._id);

      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  } catch (error) {
    res.status(401);
    res.send({ error: error.message });
  }
});

// @dec       Update order to delivered
// @route     PUT /api/orders/:id/deliver
// @access    Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.json(orders);
});

// @dec       Get  orders
// @route     GET /api/orders
// @access    Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');

  res.json(orders);
});

module.exports = {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};

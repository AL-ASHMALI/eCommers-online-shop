import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';

// Description   Create New Order
// Route         POST /api/orders
// Access        Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      orderItems: orderItems.map((order) => ({
        ...order,
        product: order._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// Description   Get orders for logged in user
// Route         GET /api/orders/myorders
// Access        Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// Description   Get orders by id
// Route         GET /api/orders/:id
// Access        Private/Admin
const getOrdersById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// Description   Update order to paid
// Route         PUT /api/orders/:id/pay
// Access        Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send('Update order to paid');
});

// Description   update order to delivered
// Route         PUT /api/orders/:id/deliver
// Access        Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send('Update order to delivered');
});

// Description   Get all orders
// Route         GET /api/orders
// Access        Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  res.send('Get all orders');
});

export {
  addOrderItems,
  getMyOrders,
  getOrdersById,
  updateOrderToDelivered,
  updateOrderToPaid,
  getOrders,
};

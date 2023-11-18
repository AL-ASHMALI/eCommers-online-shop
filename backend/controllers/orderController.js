import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';

// Description   Create New Order
// Route         POST /api/orders
// Access        Private
const addOrderItems = asyncHandler(async (req, res) => {
  res.send('Add order items');
});

// Description   Get orders for logged in user
// Route         GET /api/orders/myorders
// Access        Private
const getMyOrders = asyncHandler(async (req, res) => {
  res.send('Get my orders');
});

// Description   Get orders by id
// Route         GET /api/orders/:id
// Access        Private/Admin
const getOrdersById = asyncHandler(async (req, res) => {
  res.send('Get orders by id');
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

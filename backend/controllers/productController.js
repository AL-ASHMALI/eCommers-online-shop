import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// Description: Fetch all products
// Route: GET /api/products
// Access: public

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}); //passing an empty object to get all the products
  res.json(products);
});

// Description: Fetch a single products
// Route: GET /api/products/:id
// Access: public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export { getProducts, getProductById };
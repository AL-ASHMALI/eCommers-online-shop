import express from 'express';
const router = express.Router();
import asyncHandler from '../middleware/asyncHandler.js';
import Products from '../models/productModel.js';
import Product from '../models/productModel.js';

// All Products
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({}); //passing an empty object to get all the products
    res.json(products);
  })
);

//One Product by Id
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      return res.json(product);
    } else {
      res.status(404);
      throw new Error('Resource not found');
    }
  })
);

export default router;

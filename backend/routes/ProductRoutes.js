import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  createProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleWare.js';

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id').get(getProductById);

export default router;

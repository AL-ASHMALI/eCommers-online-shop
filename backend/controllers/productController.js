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

// Description   Create a product
// Route         POST /api/products
// Access        Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// Description   Update a product
// Route         PUT /api/products
// Access        Private/Admin

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, countInStock, category } =
    req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.countInStock = countInStock;
    product.category = category;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export { getProducts, getProductById, createProduct, updateProduct };

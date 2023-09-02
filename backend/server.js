// I will be using the ES module syntax for the backend
// to keep the consistency of using the same syntax throughout the project
import express from 'express';
import products from './data/products.js';
const port = 5000;

const app = express(); // initialize express

app.get('/', (req, res) => {
  res.send('Welcome');
});

// All Products
app.get('/api/products', (req, res) => {
  res.json(products);
});

//One Product by Id
app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.send(product);
});

app.listen(port, () => console.log(`Server is running on port ${port}`)); // this is used to start the server

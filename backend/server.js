// I will be using the ES module syntax for the backend
// to keep the consistency of using the same syntax throughout the project
import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();
import productRoutes from './routes/ProductRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
const port = process.env.PORT || 5000;

connectDB(); //connect to database (MongoDB)

const app = express(); // initialize express

app.get('/', (req, res) => {
  res.send('Welcome, The API is running ');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`)); // this is used to start the server

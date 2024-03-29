// I will be using the ES module syntax for the backend
// to keep the consistency of using the same syntax throughout the project
import path from 'path';
import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import productRoutes from './routes/ProductRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import uploadRoutes from './routes/uploadRoutes.js';

const port = process.env.PORT || 5000;

connectDB(); //connect to database (MongoDB)

const app = express(); // initialize express

// Body parser middleware/ this is needed to use the req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cookie parser middleware/ this is needed to use the req.cookie
app.use(cookieParser());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

const __dirname = path.resolve(); // set __dirname to current directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  // Set the static folder
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  // any other route that is not api will be directed to index.html
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('Welcome, The API is running... ');
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`)); // this is used to start the server

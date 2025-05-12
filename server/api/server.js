import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import serverless from 'serverless-http';

import connectDB from '../configs/db.js';
import connectCloudinary from '../configs/cloudinary.js';
import userRouter from '../routes/userRoute.js';
import sellerRouter from '../routes/sellerRoute.js';
import productRouter from '../routes/productRoute.js';
import cartRouter from '../routes/cartRoute.js';
import addressRouter from '../routes/addressRoute.js';
import orderRouter from '../routes/orderRoute.js';
import { stripeWebHook } from '../controllers/orderController.js';

const app = express();

await connectDB();
await connectCloudinary();

const allowedOrigins = ['http://localhost:5173']; // Add deployed frontend later

// Stripe webhook first (raw body)
app.post('/api/stripe', express.raw({ type: 'application/json' }), stripeWebHook);

// General middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Routes
app.get('/', (req, res) => res.send("API is running!"));
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

// Export for Vercel
export const handler = serverless(app);
export { app }; // For local dev use

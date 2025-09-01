import express from 'express';
import helmet from 'helmet';
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

import authRouter from '../routes/authRoutes.js';
import reportRoutes from '../routes/routingRoutes.js';

// import postsRouter from "./routers/postsRouter.js";

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
dotenv.config();
app.use(helmet());
app.use(cookieParser());
//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Database connection established");
}).catch((err) => {
    console.log(err);
})
app.get('/api/home', (req, res) => {
    res.json({ message: "Hello from Server" });
});

app.use('/', authRouter);
app.use('/report', reportRoutes);
// app.use('/api/post', postsRouter)




let port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});
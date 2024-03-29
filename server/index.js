import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import videoRoutes from './routes/videos.js';
import commentRoutes from './routes/comments.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();

const connect = () => {
  mongoose.set('strictQuery', false);
  
  mongoose.connect(process.env.MONGODB_URL).then(() => {
      console.log('Connected to database');
    }).catch(err => {
      throw err;
    });
};

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/comments', commentRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';

  return res.status(status).json({
    success: false,
    status,
    message
  });
});

app.listen(5555, () => {
  connect();

  console.log('Connected to server');
});

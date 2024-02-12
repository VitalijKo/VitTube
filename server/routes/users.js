import express from 'express';
import {
  getUser,
  updateUser,
  deleteUser,
  subscribe,
  unsubscribe,
  like,
  dislike
} from '../controllers/user.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

router.get('/find/:id', getUser);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);
router.put('/subscribe/:id', verifyToken, subscribe);
router.put('/unsubscribe/:id', verifyToken, unsubscribe);
router.put('/like/:videoId', verifyToken, like);
router.put('/dislike/:videoId', verifyToken, dislike);

export default router;

import express from 'express';
import {
	getVideo,
	addVideo,
	addView,
	random,
	subscriptions,
	getByTag,
	trend,
	search
} from '../controllers/video.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, addVideo);
router.put('/:id', verifyToken, addVideo);
router.delete('/:id', verifyToken, addVideo);
router.get('/find/:id', getVideo);
router.put('/view/:id', addView);
router.get('/trend', trend);
router.get('/random', random);
router.get('/subscriptions', verifyToken, subscriptions);
router.get('/tags', getByTag);
router.get('/search', search);

export default router;

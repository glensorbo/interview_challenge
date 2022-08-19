import express from 'express';

import { getPublicChat } from '../controllers/chat';

const router = express.Router();

router.get('/', getPublicChat);

export { router as ChatRoutes };

import express from 'express';

import { getCommonchat } from '../controllers/chat';

const router = express.Router();

router.get('/', getCommonchat);

export { router as ChatRoutes };

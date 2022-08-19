import express from 'express';

import { getUsersInChat, saveUserInChat } from '../controllers/user';

const router = express.Router();

router.get('/', getUsersInChat);

router.post('/', saveUserInChat);

export { router as UserRoutes };

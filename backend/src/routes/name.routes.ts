import express from 'express';

import { getAllNames, getFemaleNames, getMaleNames } from '../controllers/name';

const router = express.Router();

router.get('/', getAllNames);

router.get('/female', getFemaleNames);

router.get('/male', getMaleNames);

router.post('/name');

export { router as NameRoutes };

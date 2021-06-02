import { Router } from 'express';

import weather from './weather';

const router = Router();

router.use('/weather', weather);

export default router;

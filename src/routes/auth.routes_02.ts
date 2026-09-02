import { Router } from 'express';
import * as authController_02 from '../controllers/auth.controller_02';

const router = Router();

router.post('/login', authController_02.login);

export default router;
import { Router } from 'express';
import * as funcionarioController from '../controllers/funcionario.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();


router.post('/', funcionarioController.criar);
router.get('/', funcionarioController.listar);
router.get('/:id', authMiddleware, funcionarioController.buscarPorId);

export default router;
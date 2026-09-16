import { Router } from 'express';
import * as obraExenplarController from '../controllers/obraExemplar.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', obraExenplarController.listar); // PÚBLICA — catálogo
router.get('/:id', obraExenplarController.buscarPorId); // PÚBLICA — catálogo
router.post('/', authMiddleware, obraExenplarController.criar); // PROTEGIDA
router.put('/:id', authMiddleware, obraExenplarController.atualizar); // PROTEGIDA

export default router;
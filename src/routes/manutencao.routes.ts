import { Router } from 'express';
import * as manutencaoController from '../controllers/manutencao.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware); // RN04: todas as rotas exigem autenticação

router.post('/', manutencaoController.registrar);
/**
 * @openapi
 * /api/manutencoes:
 *   get:
 *     tags: [Manutenções]
 *     summary: Lista o catálogo de manutenções (rota pública)
 *     parameters:
 *       - name: disponibilidade
 *         in: query
 *         required: false
 *         description: Filtra pelo status da manutenção
 *         schema:
 *           type: string
 *           enum: [Disponivel, Emprestado, Manutencao]
 *         example: Disponivel
 *     responses:
 *       200:
 *         description: Lista de manutenções (com a categoria incluída)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Manutencao'
 */
router.get('/', manutencaoController.listar);
router.patch('/:id/concluir', manutencaoController.concluir);

export default router;
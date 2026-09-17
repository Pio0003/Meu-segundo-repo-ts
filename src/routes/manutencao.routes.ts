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
/**
 * @openapi
 * /api/manutencoes/{id}/concluir:
 *   patch:
 *     tags: [Manutenções]
 *     summary: Conclui a manutenção e disponibiliza o exemplar
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *         example: 1
 *     responses:
 *       200:
 *         description: Manutenção concluída; o exemplar volta a 'Disponivel'
 *       400:
 *         description: Manutenção já finalizada ou cancelada
 *       401:
 *         description: Token ausente, inválido ou expirado
 *       403:
 *         description: A manutenção pertence a OUTRO cliente
 *       404:
 *         description: Manutenção não encontrada
 */
router.patch('/:id/concluir', manutencaoController.concluir);

export default router;
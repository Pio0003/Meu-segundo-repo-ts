import { Router } from 'express';
import * as obraController from '../controllers/obra.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
/**
 * @openapi
 * /api/obras:
 *   get:
 *     tags: [Obras]
 *     summary: Lista o catálogo de obras (rota pública)
 *     parameters:
 *       - name: disponibilidade
 *         in: query
 *         required: false
 *         description: Filtra pelo status da obra
 *         schema:
 *           type: string
 *           enum: [Disponivel, Emprestado, Manutencao]
 *         example: Disponivel
 *     responses:
 *       200:
 *         description: Lista as obras (com a categoria incluída)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Obra'
 */
router.get('/', obraController.listar); // PÚBLICA — catálogo
router.get('/:id', obraController.buscarPorId); // PÚBLICA — catálogo
router.post('/', authMiddleware, obraController.criar); // PROTEGIDA
router.put('/:id', authMiddleware, obraController.atualizar); // PROTEGIDA

export default router;
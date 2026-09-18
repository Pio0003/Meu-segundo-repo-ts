import { Router } from 'express';
import * as emprestimoController from '../controllers/emprestimo.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);
/**
 * @openapi
 * /api/emprestimo:
 *   post:
 *     tags: [Emprestimo]
 *     summary: Abre um empréstimo para o cliente autenticado (RN01)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [obraId, dataPrevistaDevolucao]
 *             properties:
 *               obraId: { type: integer, example: 1 }
 *               dataPrevistaDevolucao:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-09-10T12:00:00.000Z"
 *     responses:
 *       201:
 *         description: Empréstimo criado; a obra passa a 'Emprestada'
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Emprestimo'
 *       400:
 *         description: Obra indisponível (RN01) ou data inválida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 *       404:
 *         description: Obra não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.post('/', emprestimoController.abrir);
/**
 * @openapi
 * /api/emprestimos:
 *   get:
 *     tags: [Emprestimos]
 *     summary: Lista o catálogo de empréstimos (rota pública)
 *     parameters:
 *       - name: disponibilidade
 *         in: query
 *         required: false
 *         description: Filtra pelo status do empréstimo
 *         schema:
 *           type: string
 *           enum: [Disponivel, Locado, Manutencao]
 *         example: Disponivel
 *     responses:
 *       200:
 *         description: Lista de empréstimos (com a categoria incluída)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Emprestimo'
 */
router.get('/', emprestimoController.listar);
/**
 * @openapi
 * /api/emprestimos/{id}:
 *   get:
 *     tags: [Emprestimos]
 *     summary: Busca um empréstimo pelo id
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
 *         description: Emprestimo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/emprestimo'
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 *       404:
 *         description: Emprestimo não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.get('/:id', emprestimoController.buscarPorId);
/**
 * @openapi
 * /api/emprestimo/{id}/devolver:
 *   patch:
 *     tags: [Emprestimo]
 *     summary: Devolve a obra e finaliza o contrato (RN02)
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
 *         description: Devolvido; a obra volta a 'Disponivel'
 *       400:
 *         description: Emprestimo já finalizado ou cancelado
 *       401:
 *         description: Token ausente, inválido ou expirado
 *       403:
 *         description: O emprestimo pertence a OUTRO cliente
 *       404:
 *         description: Emprestimo não encontrado
 */
router.patch('/:id/devolver', emprestimoController.devolver);
router.patch('/:id/cancelar', emprestimoController.cancelar);

export default router;
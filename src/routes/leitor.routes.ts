import { Router } from 'express';
import * as clienteController from '../controllers/leitor.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();


/**
 * @openapi
 * /api/leitor:
 *   post:
 *     tags: [Clientes]
 *     summary: Cadastra um novo cliente (rota pública)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, email, senha, matricula, possuiPendencia]
 *             properties:
 *               nome: { type: string, example: "Marina Souza" }
 *               email: { type: string, format: email, example: "marina@teste.com" }
 *               senha: { type: string, example: "123456" }
 *               matricula: { type: string, example: "98765432100" }
 *               possuiPendencia: { type: boolean, example: true }
 *     responses:
 *       201:
 *         description: Cliente criado (sem o campo senha)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Biblioleitor'
 *       409:
 *         description: Matricula ou e-mail já cadastrados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.post('/', clienteController.criar); // PÚBLICA — cadastro
router.get('/', authMiddleware, clienteController.listar); // PROTEGIDA
/**
 * @openapi
 * /api/leitor/{id}:
 *   get:
 *     tags: [Clientes]
 *     summary: Busca um cliente pelo id
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
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BiblioLeitor'
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 *       404:
 *         description: Cliente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */

router.get('/:id', authMiddleware, clienteController.buscarPorId); // PROTEGIDA

export default router;
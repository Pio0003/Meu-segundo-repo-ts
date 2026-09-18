import { Router } from 'express';
import * as funcionarioController from '../controllers/funcionario.controller';
import { authMiddleware } from '../middlewares/auth.funcionario.middleware';

const router = Router();

/**
 * @openapi
 * /api/funcionario:
 *   post:
 *     tags: [Funcionario]
 *     summary: Cadastra um novo funcionario (rota pública)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, cargo, email, senha]
 *             properties:
 *               nome: { type: string, example: "Marcos Souza" }
 *               cargo: { type: string, example: "Bibliotecario" }
 *               email: { type: string, format: email, example: "marcos@teste.com" }
 *               senha: { type: string, example: "123456" }
 *     responses:
 *       201:
 *         description: Funcionario criado (sem o campo senha)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BiblioFuncionario'
 *       409:
 *         description: E-mail já cadastrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.post('/', funcionarioController.criar);
router.get('/', authMiddleware, funcionarioController.listar);
/**
 * @openapi
 * /api/funcionario/{id}:
 *   get:
 *     tags: [Funcionario]
 *     summary: Busca um funcionario pelo id
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
 *         description: Funcionario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BiblioFuncionario'
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 *       404:
 *         description: Funcionario não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.get('/:id', authMiddleware, funcionarioController.buscarPorId);

export default router;
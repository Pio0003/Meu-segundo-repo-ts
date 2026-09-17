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
/**
 * @openapi
 * /api/obras/{id}:
 *   get:
 *     tags: [Obras]
 *     summary: Busca uma obra pelo id
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
 *         description: Obra encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Obra'
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
router.get('/:id', obraController.buscarPorId); // PÚBLICA — catálogo
/**
 * @openapi
 * /api/obras:
 *   post:
 *     tags: [Obras]
 *     summary: Cadastra uma nova obra (rota pública)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: ["titulo", "autor", "categoriaid", "editora", "statusDisponibilidade"]
 *             properties:
 *               titulo: { type: string, example: "Dom Casmurro" }
 *               autor: { type: string, example: "Machado de Assis" }
 *               categoriaid: { type: integer, example: 1 }
 *               editora: { type: string, example: "Editora Companhia" }
 *               statusDisponibilidade: { type: string, example: "Disponivel" }
 *     responses:
 *       201:
 *         description: Obra criada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Obra'
 *       409:
 *         description: Titulo ou autor já cadastrados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.post('/', authMiddleware, obraController.criar); // PROTEGIDA
router.put('/:id', authMiddleware, obraController.atualizar); // PROTEGIDA

export default router;
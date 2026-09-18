import { Router } from 'express';
import * as obraExenplarController from '../controllers/obraExemplar.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @openapi
 * /api/obraExemplar:
 *   get:
 *     tags: [ObraExemplar]
 *     summary: Lista o catálogo de exemplares (rota pública)
 *     parameters:
 *       - name: disponibilidade
 *         in: query
 *         required: false
 *         description: Filtra pelo status do exemplar
 *         schema:
 *           type: string
 *           enum: [Disponivel, Locado, Manutencao]
 *         example: Disponivel
 *     responses:
 *       200:
 *         description: Lista de exemplares (com a categoria incluída)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ObraExemplar'
 */
router.get('/', obraExenplarController.listar); // PÚBLICA — catálogo
/**
 * @openapi
 * /api/obraExemplar/{id}:
 *   get:
 *     tags: [ObraExemplar]
 *     summary: Busca um exemplar pela id
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
 *         description: Exemplar encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ObraExemplar'
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 *       404:
 *         description: Exemplar não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.get('/:id', obraExenplarController.buscarPorId); // PÚBLICA — catálogo
/**
 * @openapi
 * /api/obraExemplar:
 *   post:
 *     tags: [ObraExemplar]
 *     summary: Cadastra um novo exemplar (rota pública)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: ["id_obra", "codigo_exemplar", "estado_de_conservacao"]
 *             properties:
 *               id_obra: { type: integer, example: 1 }
 *               codigo_exemplar: { type: string, example: "EX001" }
 *               estado_de_conservacao: { type: string, example: "Boa" }
 *               telefone: { type: string, example: "11988887777" }
 *     responses:
 *       201:
 *         description: Exemplar criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ObraExemplar'
 *       409:
 *         description: Exemplar já cadastrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.post('/', authMiddleware, obraExenplarController.criar); // PROTEGIDA
router.put('/:id', authMiddleware, obraExenplarController.atualizar); // PROTEGIDA

export default router;
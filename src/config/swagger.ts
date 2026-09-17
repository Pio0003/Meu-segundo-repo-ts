import swaggerJSDoc from 'swagger-jsdoc';


export const swaggerSpec = swaggerJSDoc({
    definition: {

        openapi: '3.0.3',

        info: {
            title: 'Biblio_Tech API',
            version: '1.0.0',
            description:
                'API RESTful do sistema de emprestimo de obras literárias Biblio_Tech. ' +
                'Fluxo típico: cadastre um cliente, faça login para obter um token JWT ' +
                'e use o botão **Authorize** acima para testar as rotas protegidas.',
        },

        servers: [
            { url: 'http://localhost:3333', description: 'Ambiente de desenvolvimento' },
        ],

        tags: [
            { name: 'Autenticação', description: 'Login e emissão de token JWT' },
            { name: 'Clientes', description: 'Cadastro e consulta de leitores' },
            { name: 'Funcionario', description: 'Cadastro e consulta de funcionarios' },
            { name: 'Obras', description: 'Catálogo de obras da frota' },
            { name: 'ObrasExemplares', description: 'Catálogo de exemplares de obras da frota' },
            { name: 'Emprestimo', description: 'Abertura, devolução e cancelamento (RN01/RN02)' },
            { name: 'Manutenções', description: 'Registro e conclusão de manutenções (RN03)' },
        ],

        components: {

            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description:
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJmdW5jaW9uYXJpb0B0ZXN0ZS5jb20iLCJpYXQiOjE3ODk1NjgyMDUsImV4cCI6MTc4OTY1NDYwNX0.7KJ0o1_HhCnTUg7vrodwwXED7S6iFvLh-wZemZttxl4',
                },
            },


            schemas: {
                RespostaErro: {
                    type: 'object',
                    properties: {
                        erro: { type: 'string', example: 'Mensagem explicando o que deu errado.' },
                    },
                },
                BiblioLeitor: {
                    type: 'object',
                    description: 'Cliente SEM o campo senha (a senha nunca sai do banco).',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        nome: { type: 'string', example: 'Cliente Teste' },
                        matricula: { type: 'string', example: '12345678900' },
                        email: { type: 'string', format: 'email', example: 'cliente@teste.com' },
                        possuiPendencia: { type: 'boolean', example: 'true' },
                        criadoEm: { type: 'string', format: 'date-time' },
                    },
                },
                BiblioFuncionario: {
                    type: 'object',
                    description: 'Funcionario SEM o campo senha (a senha nunca sai do banco).',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        nome: { type: 'string', example: 'Funcionario Teste' },
                        cargo: { type: 'string', example: 'Bibliotecario' },
                        email: { type: 'string', format: 'email', example: 'funcionario@teste.com' },
                        criadoEm: { type: 'string', format: 'date-time' },
                    },
                },
                CategoriaObra: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        nomeCategoria: { type: 'string', example: 'Infantil' },
                    },
                },
                Obra: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        categoriaId: { type: 'integer', example: 1 },
                        autor: { type: 'string', example: 'Bram Stoker' },
                        titulo: { type: 'string', example: 'Drácula' },
                        editora: { type: 'string', example: 'Archibald Constable and Company' },
                        statusDisponibilidade: {
                            type: 'string',
                            enum: ['Disponivel', 'Emprestado', 'Manutencao'],
                            example: 'Disponivel',
                        },
                        categoria: { $ref: '#/components/schemas/CategoriaObra' },
                    },
                },
                ObraExemplar: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        obraId: { type: 'integer', example: 1 },
                        codigo_exemplar: { type: 'string', example: 'ex-02' },
                        status_de_conservacao: {
                            type: 'string',
                            enum: ['Desgastado', 'Bom', 'Exelente'],
                            example: 'Bom',
                        },
                        obra: { $ref: '#/components/schemas/Obra' },
                    },
                },        
                        Emprestimo: {
                            type: 'object',
                            properties: {
                                id: { type: 'integer', example: 1 },
                                leitorId: { type: 'integer', example: 1 },
                                funcionarioId: { type: 'integer', example: 1 },
                                obraId: { type: 'integer', example: 1 },
                                exemplarId: { type: 'integer', example: 1 },
                                dataRetirada: { type: 'string', format: 'date-time' },
                                dataPrevistaDevolucao: { type: 'string', format: 'date-time' },
                                dataDevolucaoReal: { type: 'string', format: 'date-time', nullable: true },
                                valorTotal: { type: 'number', example: 360 },
                                statusEmprestimo: {
                                    type: 'string',
                                    enum: ['Ativo', 'Finalizado', 'Cancelado'],
                                    example: 'Ativo',
                                },
                                Obra: { $ref: '#/components/schemas/Obra' },
                            },
                        },
                        Manutencao: {
                            type: 'object',
                            properties: {
                                id: { type: 'integer', example: 1 },
                                obraId: { type: 'integer', example: 3 },
                                descricaoServico: { type: 'string', example: 'Restauração de Páginas' },
                                dataManutencao: { type: 'string', format: 'date-time' },
                                valorCusto: { type: 'number', example: 150 },
                                obra: { $ref: '#/components/schemas/Obra' },
                            },
                        },
                    },
                },
            },
        apis: ['./src/routes/*.ts', './dist/routes/*.js'],
    });
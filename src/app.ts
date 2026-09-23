import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import { routes } from './routes';
import { erroHandler } from './middlewares/error.middleeare';

const app = express();

app.use(cors());
app.use(express.json());

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/api-docs.json', (_req, res) => {
     res.json(swaggerSpec);
});

app.use('/api', routes);

app.get('/', (_req, res) => {
     res.json({ mensagem: 'O Biblio-Leitor está online.' });
});

app.use(erroHandler);

export { app };
export default app;
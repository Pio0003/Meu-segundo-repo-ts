import 'express-async-errors';

import express from 'express';
import cors from 'cors';
import { routes } from './routes';
import { erroHandler } from './middlewares/error.middleeare';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.get('/', (req, res) => {
     res.json({mensagem: 'O Biblio-Leitor está online.'});
});

app.use(erroHandler);

export {app};
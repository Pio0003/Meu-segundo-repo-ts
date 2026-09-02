import { Router } from 'express';
import authRoutes from './auth.routes';
import authRoutes_02 from './auth.routes_02';
import clienteRoutes from './leitor.routes';
import obraRoutes from './obra.routes';
import funcionarioRoutes from './funcionario.routes';
import obraExemplarRoutes from './obraExemplar.routes';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/auth', authRoutes_02)
routes.use('/obras', obraRoutes);
routes.use('/clientes', clienteRoutes);
routes.use('/exemplares', obraExemplarRoutes);
routes.use('/funcionario', funcionarioRoutes);

export { routes };
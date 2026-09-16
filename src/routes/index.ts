import { Router } from 'express';
import authRoutes from './auth.routes';
import authRoutes_02 from './auth.routes_02';
import leitorRoutes from './leitor.routes';
import obraRoutes from './obra.routes';
import obraExemplarRoutes from './obraExemplar.routes';
import funcionarioRoutes from './funcionario.routes';
import emprestimoRoutes from './emprestimo.routes';
import manutencaoRoutes from './manutencao.routes';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/auth', authRoutes_02)
routes.use('/obras', obraRoutes);
routes.use('/leitor', leitorRoutes);
routes.use('/exemplares', obraExemplarRoutes);
routes.use('/funcionario', funcionarioRoutes);
routes.use('/emprestimo', emprestimoRoutes);
routes.use('/manutencao', manutencaoRoutes);

export { routes };
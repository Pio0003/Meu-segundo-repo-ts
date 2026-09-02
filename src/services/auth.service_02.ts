import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma';
import { AppError } from '../middlewares/error.middleeare';

interface LoginInput {
  email: string;
  senha: string;
}

export async function login(dados: LoginInput) {
  const funcionario = await prisma.biblioFuncionario.findUnique({ where: { email: dados.email } });

  const senhaConfere = await bcrypt.compare(dados.senha, funcionario?.senha ?? '');

  if (!funcionario || !senhaConfere) {
    throw new AppError('E-mail ou senha inválidos.', 401);
  }

  const token = jwt.sign(
    { id: funcionario.id, email: funcionario.email },
    process.env.JWT_SECRET as string,
    { expiresIn: (process.env.JWT_EXPIRES_IN || '1d') as jwt.SignOptions['expiresIn'] }
  );

  return {
    token,
    funcionario: { id: funcionario.id, nome: funcionario.nome, email: funcionario.email },
  };
}
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma';
import { AppError } from '../middlewares/error.middleeare';

interface LoginInput {
  email: string;
  senha: string;
}

export async function login(dados: LoginInput) {
  const cliente = await prisma.biblioLeitor.findUnique({ where: { email: dados.email } });

  // bcrypt.compare NUNCA "descriptografa" o hash — ele recalcula o hash da
  // senha recebida e compara os dois hashes entre si. Se "cliente" não
  // existir, ainda comparamos contra uma string vazia, só para não deixar o
  // tempo de resposta óbvio demais (evita "enumeração de utilizadores").
  const senhaConfere = await bcrypt.compare(dados.senha, cliente?.senha ?? '');

  // Mesma mensagem de erro para "não existe" e "senha errada" — de propósito,
  // por segurança: não revelamos qual dos dois motivos causou a falha.
  if (!cliente || !senhaConfere) {
    throw new AppError('Email ou senha inválidos.', 401);
  }

  const token = jwt.sign(
    { id: cliente.id, email: cliente.email },
    process.env.JWT_SECRET as string,
    { expiresIn: (process.env.JWT_EXPIRES_IN || '1d') as jwt.SignOptions['expiresIn'] }
  );

  return {
    token,
    cliente: { id: cliente.id, nome: cliente.nome, email: cliente.email },
  };
}
export async function login2(dados: LoginInput) {
  const funcionario = await prisma.biblioFuncionario.findUnique({ where: { email: dados.email } });

  const senhaConfere = await bcrypt.compare(dados.senha, funcionario?.senha ?? '');

  if (!funcionario || !senhaConfere) {
    throw new AppError('Email ou senha inválidos.', 401);
  }

  const token = jwt.sign(
    { id: funcionario.id, email: funcionario.email },
    process.env.JWT_SECRET as string,
    { expiresIn: (process.env.JWT_EXPIRES_IN || '1d') as jwt.SignOptions['expiresIn'] }
  );

  return {
    token,
    cliente: { id: funcionario.id, nome: funcionario.nome, email: funcionario.email },
  };
}
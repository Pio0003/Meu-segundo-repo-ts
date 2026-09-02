import bcrypt from 'bcryptjs';
import { prisma } from '../config/prisma';
import { AppError } from '../middlewares/error.middleeare';

const SELECT_FUNCIONARIO_PUBLICO = {
  id: true,
  nome: true,
  cargo: true,
  email: true,
  senha: true,
  criadoEm: true,
} as const;

interface CriarFuncionarioInput {
  nome: string;
  cargo: string;
  email: string;
  senha: string;
}

export async function criarFuncionario(dados: CriarFuncionarioInput) {
  const senhaHash = await bcrypt.hash(dados.senha, 10);

  const funcionarioCriado = await prisma.biblioFuncionario.create({
    data: { ...dados, senha: senhaHash },
    select: SELECT_FUNCIONARIO_PUBLICO,
  });

  return funcionarioCriado;
}

export async function listarFuncionario() {
  return prisma.biblioFuncionario.findMany({
    select: SELECT_FUNCIONARIO_PUBLICO,
    orderBy: { id: 'asc' },
  });
}

export async function buscarFuncionarioPorId(id: number) {
  const funcionario = await prisma.biblioFuncionario.findUnique({
    where: { id },
    select: SELECT_FUNCIONARIO_PUBLICO,
  });

  if (!funcionario) {
    throw new AppError('Funcionario não encontrado.', 404);
  }

  return funcionario;
}
import { prisma } from '../config/prisma';
import { AppError } from '../middlewares/error.middleeare';

interface AdicionarExemplarInput {
  id: number;
  id_obra: number;
  codigo_exemplar: string;
  estado_de_conservacao: string;
}

interface AtualizarExemplaresInput {
  id?: number;
  id_obra?: number;
  codigo_exemplar?: string;
  estado_de_conservacao?: string;
  statusExemplar?: string;
}

export async function adicionarExemplar(dados: AdicionarExemplarInput) {

  const obra = await prisma.obra.findUnique({
    where: { id: dados.id_obra },
  });

  if (!obra) {
    throw new AppError('Obra não encontrada.', 404);
  }

  const exemplar = await prisma.obraExemplar.create({
    data: dados,
  });

  return exemplar;
}

export async function listarExemplares(statusExemplar?: string) {

  return prisma.obraExemplar.findMany({
    where: statusExemplar ? { statusExemplar } : undefined,
    orderBy: { id: 'asc' },
  });
}

export async function buscarExemplarPorId(id: number) {
  const exemplar = await prisma.obraExemplar.findUnique({
    where: { id },
  });

  if (!exemplar) {
    throw new AppError('Exemplar não encontrado.', 404);
  }

  return exemplar;
}

export async function atualizarExemplares(id: number, dados: AtualizarExemplaresInput) {

  await buscarExemplarPorId(id);

  return prisma.obraExemplar.update({
    where: { id },
    data: dados,
  });
}
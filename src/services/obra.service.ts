import { prisma } from '../config/prisma';
import { AppError } from '../middlewares/error.middleeare';

interface CriarObraInput {
  categoriaId: number;
  autor: string;
  titulo: string;
  editora: string;
  genero: string;
}

interface AtualizarObraInput {
  categoriaId?: number;
  autor?: string;
  titulo?: string;
  editora?: string;
  genero?: string;
  statusDisponibilidade?: string;
}

export async function criarObra(dados: CriarObraInput) {
  // Validamos que a categoria existe ANTES de criar a obra, para não
  // deixar uma obra "órfão" apontando para uma categoria inexistente.
  const categoria = await prisma.categoriaObra.findUnique({
    where: { id: dados.categoriaId },
  });

  if (!categoria) {
    throw new AppError('Categoria da obra não encontrada.', 404);
  }

  // statusDisponibilidade não é informado: o schema já define o valor padrão
  // 'Disponivel' para toda obra nova (@default("Disponivel")).
  const obra = await prisma.obra.create({
    data: dados,
    include: { categoria: true },
  });

  return obra;
}

export async function listarObras(statusDisponibilidade?: string) {
  // "include" traz os dados da relação (a categoria inteira); "select" seria
  // usado quando quiséssemos restringir CAMPOS específicos, não relações.
  return prisma.obra.findMany({
    where: statusDisponibilidade ? { statusDisponibilidade } : undefined,
    include: { categoria: true },
    orderBy: { id: 'asc' },
  });
}

export async function buscarObrasPorId(id: number) {
  const obra = await prisma.obra.findUnique({
    where: { id },
    include: { categoria: true },
  });

  if (!obra) {
    throw new AppError('Obra não encontrado.', 404);
  }

  return obra;
}

export async function atualizarObra(id: number, dados: AtualizarObraInput) {
  // Reaproveita a validação de existência (já lança 404 se não encontrar).
  await buscarObrasPorId(id);

  return prisma.obra.update({
    where: { id },
    data: dados,
    include: { categoria: true },
  });
}
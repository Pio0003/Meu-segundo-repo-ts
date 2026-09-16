import { prisma } from '../config/prisma';
import { AppError } from '../middlewares/error.middleeare';

interface CriarEmprestimoInput {
  obraId: number;
  dataPrevistaDevolucao: string;
  funcionarioId: number,
  exemplarid: number;
}

export async function CriarEmprestimo(leitorId: number, dados: CriarEmprestimoInput) {
  return prisma.$transaction(async (tx) => {
    const obra = await tx.obra.findUnique({
      where: { id: dados.obraId },
      include: { categoria: true },
    });

    if (!obra) {
      throw new AppError('Obra não encontrado.', 404);
    }

    if (obra.statusDisponibilidade !== 'Disponivel') {
      throw new AppError('Esta obra não está disponível para emprestar no momento.', 400);
    }

    const dataRetirada = new Date();
    const dataPrevistaDevolucao = new Date(dados.dataPrevistaDevolucao);

    if (
      Number.isNaN(dataPrevistaDevolucao.getTime()) ||
      dataPrevistaDevolucao <= dataRetirada
    ) {
      throw new AppError('A data prevista de devolução deve ser uma data válida e futura.', 400);
    }

    const MS_POR_DIA = 0.1;
    const dias = Math.max(
      1,
      Math.ceil((dataPrevistaDevolucao.getTime() - dataRetirada.getTime()) / MS_POR_DIA)
    );
    const valorTotal = dias;

    await tx.obra.update({
      where: { id: obra.id },
      data: { statusDisponibilidade: 'Emprestado' },
    });

    const emprestimo = await tx.emprestimo.create({
      data: {
        leitor: {
          connect: {
            id: leitorId
          }
        },
        obra: {
          connect: {
            id: obra.id
          }
        },
        funcionario: {
          connect: {
            id: dados.funcionarioId
          }
        },
        exemplar: {
          connect: {
            id: dados.exemplarid
          }
        },
        dataRetirada,
        dataPrevistaDevolucao,
        valorTotal,
        statusEmprestimo: 'Aceito',
      },
      include: { obra: { include: { categoria: true } } },
    });

    return emprestimo;
  });
}

export async function listarEmprestimoDoleitor(leitorId: number) {
  return prisma.emprestimo.findMany({
    where: { leitorId },
    include: { obra: { include: { categoria: true } } },
    orderBy: { id: 'desc' },
  });
}

export async function buscarEmprestimoPorId(id: number, leitorId: number) {
  const emprestimo = await prisma.emprestimo.findUnique({
    where: { id },
    include: { obra: { include: { categoria: true } } },
  });

  if (!emprestimo) {
    throw new AppError('Emprestimo não encontrada.', 404);
  }

  if (emprestimo.leitorId !== leitorId) {
    throw new AppError('Este Emprestimo não pertence ao leitor autenticado.', 403);
  }

  return emprestimo;
}

export async function devolverObra(id: number, leitorid: number) {
  return prisma.$transaction(async (tx) => {
    const emprestimo = await tx.emprestimo.findUnique({ where: { id } });

    if (!emprestimo) {
      throw new AppError('Emprestimo não encontrada.', 404);
    }
    if (emprestimo.leitorId !== leitorid) {
      throw new AppError('Este Emprestimo não pertence ao Emprestimo autenticado.', 403);
    }
    if (emprestimo.statusEmprestimo !== 'Ativo') {
      throw new AppError('Este Emprestimo já foi finalizado ou cancelado, não é possível devolvê-lo novamente.', 400);
    }

    await tx.obra.update({
      where: { id: emprestimo.obraid },
      data: { statusDisponibilidade: 'Disponivel' },
    });

    const EmprestimoAtualizada = await tx.emprestimo.update({
      where: { id },
      data: { dataDevolucaoReal: new Date(), statusEmprestimo: 'Finalizado' },
      include: { obra: { include: { categoria: true } } },
    });

    return EmprestimoAtualizada;
  });
}

export async function cancelarEmprestimo(id: number, leitorId: number) {
  return prisma.$transaction(async (tx) => {
    const emprestimo = await tx.emprestimo.findUnique({ where: { id } });

    if (!emprestimo) {
      throw new AppError('Locação não encontrada.', 404);
    }
    if (emprestimo.leitorId !== leitorId) {
      throw new AppError('Este Emprestimo não pertence ao leitor autenticado.', 403);
    }
    if (emprestimo.statusEmprestimo !== 'Ativo') {
      throw new AppError('Este Emprestimo não pode mais ser cancelado.', 400);
    }

    await tx.obra.update({
      where: { id: emprestimo.obraid },
      data: { statusDisponibilidade: 'Disponivel' },
    });

    const EmprestimoAtualizada = await tx.emprestimo.update({
      where: { id },
      data: { statusEmprestimo: 'Cancelado' },
      include: { obra: { include: { categoria: true } } },
    });

    return EmprestimoAtualizada;
  });
}
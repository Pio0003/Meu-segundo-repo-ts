import { prisma } from '../config/prisma';
import { AppError } from '../middlewares/error.middleeare';

interface RegistrarManutencaoInput {
    obraid: number;
    descricaoServico: string;
    valorCusto: number;
}

export async function registrarManutencao(dados: RegistrarManutencaoInput) {
    return prisma.$transaction(async (tx) => {
        const obra = await tx.obra.findUnique({ where: { id: dados.obraid } });

        if (!obra) {
            throw new AppError('Obra não encontrado.', 404);
        }
        if (obra.statusDisponibilidade === 'Emprestado') {
            throw new AppError('Não é possível registar manutenção em uma obra que está atualmente emprestada.', 400);
        }

        await tx.obra.update({
            where: { id: dados.obraid },
            data: { statusDisponibilidade: 'Manutencao' },
        });

        const manutencao = await tx.manutencao.create({
            data: dados,
            include: { obra: true },
        });

        return manutencao;
    });
}

export async function listarManutencoes() {
    return prisma.manutencao.findMany({
        include: { obra: true },
        orderBy: { id: 'desc' },
    });
}

export async function concluirManutencao(id: number) {
    return prisma.$transaction(async (tx) => {
        const manutencao = await tx.manutencao.findUnique({
            where: { id },
            include: { obra: true },
        });

        if (!manutencao) {
            throw new AppError('Registo de manutenção não encontrado.', 404);
        }
        if (manutencao.obra.statusDisponibilidade !== 'Manutencao') {
            throw new AppError('Este exemplar não está atualmente em manutenção.', 400);
        }

        const obraAtualizado = await tx.obra.update({
            where: { id: manutencao.obraid },
            data: { statusDisponibilidade: 'Disponivel' },
        });

        return obraAtualizado;
    });
}
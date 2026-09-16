import bcrypt from 'bcryptjs';
import { prisma } from '../config/prisma';
import { AppError } from '../middlewares/error.middleeare';



const SELECT_CLIENTE_PUBLICO = {
    id: true,
    nome: true,
    email: true,
    senha: true,
    matricula: true,
    possuiPendencia: true,
    criadoEm: true,
} as const;

interface CriarClienteInput {
    nome: string;
    email: string;
    senha: string;
    matricula: string;
    possuiPendencia: boolean;
}

export async function criarCliente(dados: CriarClienteInput) {

    const senhaHash = await bcrypt.hash(dados.senha, 10);

    const clienteCriado = await prisma.biblioLeitor.create({
        data: { ...dados, senha: senhaHash },
        select: SELECT_CLIENTE_PUBLICO,
    });

    return clienteCriado;
}

export async function listarClientes() {
    return prisma.biblioLeitor.findMany({
        select: SELECT_CLIENTE_PUBLICO,
        orderBy: { id: 'asc' },
    });
}

export async function buscarClientePorId(id: number) {
    const cliente = await prisma.biblioLeitor.findUnique({
        where: { id },
        select: SELECT_CLIENTE_PUBLICO,
    });

    if (!cliente) {
        throw new AppError('Cliente não encontrado', 404);
    }
    return cliente;
}
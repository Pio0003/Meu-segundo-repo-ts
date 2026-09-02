import bcrypt from 'bcryptjs';
import { prisma } from '../src/config/prisma';

async function main() {
  console.log('Iniciando o seed da base de dados do DriveRent...');

  const romance = await prisma.categoriaObra.create({
    data: { nomeCategoria: 'Romance' },
  });
   const conto = await prisma.categoriaObra.create({
    data: { nomeCategoria: 'Conto' },
  });
   const horror = await prisma.categoriaObra.create({
    data: { nomeCategoria: 'Horror' },
  });
  const gastronomia = await prisma.categoriaObra.create({
    data: { nomeCategoria: 'Gastronomia' },
  });
  const infantil = await prisma.categoriaObra.create({
    data: { nomeCategoria: 'Infantil' },
  });
    const fantasia = await prisma.categoriaObra.create({
    data: { nomeCategoria: 'Fantasia' },
  });
   const biografia = await prisma.categoriaObra.create({
    data: { nomeCategoria: 'Biografia' },
  });
  const ficcao_cientifica = await prisma.categoriaObra.create({
    data: { nomeCategoria: 'Ficção Científica' },
  });
  const acao_e_aventura = await prisma.categoriaObra.create({
    data: { nomeCategoria: 'Ação e Aventura' },
  });
  const ficcao_policial = await prisma.categoriaObra.create({
    data: { nomeCategoria: 'Ficção Policial'},
  });
  console.log('Categorias criadas: Infantil, História, Técnicos.');

  await prisma.obra.createMany({
    data: [
      { categoriaId: fantasia.id, titulo: 'O Senhor dos Anéis', autor: 'J.R.R. Tolkien', editora: 'George Allen & Unwin', statusDisponibilidade: 'Disponivel' },
      { categoriaId: infantil.id, titulo: 'O Pequeno Príncipe', autor: 'Antoine de Saint-Exupéry', editora: 'Reynal & Hitchock', statusDisponibilidade: 'Disponivel' },
      { categoriaId: romance.id, titulo: 'A Hipótese do Amor', autor: 'Ali Hazelwood', editora: 'Arqueiro', statusDisponibilidade: 'Disponivel' },
      { categoriaId: conto.id, titulo: '50 Contos de Machado de Assis', autor: 'John Gledson', editora: 'Editora Companhia das Letras', statusDisponibilidade: 'Atraso' },
      { categoriaId: acao_e_aventura.id, titulo: 'Os Três Mosqueteiros', autor: 'Alexandre Dumas', editora: 'Edições Baudry', statusDisponibilidade: 'Disponivel' },
    ],
  });
  console.log('5 obras adiconadas (4 Disponíveis, 1 em Atrso).');

  const senhaHash = await bcrypt.hash('123456', 10);
  await prisma.biblioLeitor.create({
    data: {
      nome: 'Cliente Teste',
      matricula: '12345678900',
      email: 'cliente@teste.com',
      senha: senhaHash,
      possuiPendencia: true,
    },
  });
  console.log('Cliente de teste criado (email: cliente@teste.com, senha: 123456).');

  console.log('Seed concluído com sucesso!');
}

main()
  .catch((erro) => {
    console.error('Erro ao executar o seed:', erro);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
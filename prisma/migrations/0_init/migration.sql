-- CreateTable
CREATE TABLE "BiblioLeitor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "possuiPendencia" BOOLEAN NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BiblioLeitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria_Obras" (
    "id" SERIAL NOT NULL,
    "nomeCategoria" TEXT NOT NULL,

    CONSTRAINT "Categoria_Obras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Obras" (
    "id" SERIAL NOT NULL,
    "categoriaId" INTEGER NOT NULL,
    "autor" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "editora" TEXT NOT NULL,
    "statusDisponibilidade" TEXT NOT NULL DEFAULT 'Disponivel',

    CONSTRAINT "Obras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Funcionario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Funcionario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ObraExemplar" (
    "id" SERIAL NOT NULL,
    "id_obra" INTEGER NOT NULL,
    "codigo_exemplar" TEXT NOT NULL,
    "estado_de_conservacao" TEXT NOT NULL,
    "statusExemplar" TEXT NOT NULL DEFAULT 'Disponivel',

    CONSTRAINT "ObraExemplar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Emprestimo" (
    "id" SERIAL NOT NULL,
    "leitorId" INTEGER NOT NULL,
    "funcionarioId" INTEGER NOT NULL,
    "obraid" INTEGER NOT NULL,
    "exemplarid" INTEGER NOT NULL,
    "dataRetirada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataPrevistaDevolucao" TIMESTAMP(3) NOT NULL,
    "dataDevolucaoReal" TIMESTAMP(3),
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "statusEmprestimo" TEXT NOT NULL DEFAULT 'Aceito',

    CONSTRAINT "Emprestimo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manutencoes" (
    "id" SERIAL NOT NULL,
    "obraid" INTEGER NOT NULL,
    "descricaoServico" TEXT NOT NULL,
    "dataManutencao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valorCusto" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Manutencoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BiblioLeitor_email_key" ON "BiblioLeitor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BiblioLeitor_matricula_key" ON "BiblioLeitor"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "Funcionario_email_key" ON "Funcionario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ObraExemplar_id_obra_key" ON "ObraExemplar"("id_obra");

-- CreateIndex
CREATE UNIQUE INDEX "ObraExemplar_codigo_exemplar_key" ON "ObraExemplar"("codigo_exemplar");

-- AddForeignKey
ALTER TABLE "Obras" ADD CONSTRAINT "Obras_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria_Obras"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObraExemplar" ADD CONSTRAINT "ObraExemplar_id_obra_fkey" FOREIGN KEY ("id_obra") REFERENCES "Obras"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Emprestimo" ADD CONSTRAINT "Emprestimo_leitorId_fkey" FOREIGN KEY ("leitorId") REFERENCES "BiblioLeitor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Emprestimo" ADD CONSTRAINT "Emprestimo_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "Funcionario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Emprestimo" ADD CONSTRAINT "Emprestimo_obraid_fkey" FOREIGN KEY ("obraid") REFERENCES "Obras"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Emprestimo" ADD CONSTRAINT "Emprestimo_exemplarid_fkey" FOREIGN KEY ("exemplarid") REFERENCES "ObraExemplar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manutencoes" ADD CONSTRAINT "Manutencoes_obraid_fkey" FOREIGN KEY ("obraid") REFERENCES "Obras"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


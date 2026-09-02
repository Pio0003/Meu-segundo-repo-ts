-- CreateTable
CREATE TABLE "BiblioLeitor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "possuiPendencia" BOOLEAN NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Categoria_Obras" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomeCategoria" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Obras" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoriaId" INTEGER NOT NULL,
    "autor" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "editora" TEXT NOT NULL,
    "statusDisponibilidade" TEXT NOT NULL DEFAULT 'Disponivel',
    CONSTRAINT "Obras_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria_Obras" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Funcionario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "BiblioLeitor_email_key" ON "BiblioLeitor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BiblioLeitor_matricula_key" ON "BiblioLeitor"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "Funcionario_email_key" ON "Funcionario"("email");

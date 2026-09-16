-- CreateTable
CREATE TABLE "Emprestimo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "leitorId" INTEGER NOT NULL,
    "funcionarioId" INTEGER NOT NULL,
    "obraid" INTEGER NOT NULL,
    "exemplarid" INTEGER NOT NULL,
    "dataRetirada" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataPrevistaDevolucao" DATETIME NOT NULL,
    "dataDevolucaoReal" DATETIME,
    "valorTotal" REAL NOT NULL,
    "statusEmprestimo" TEXT NOT NULL DEFAULT 'Aceito',
    CONSTRAINT "Emprestimo_leitorId_fkey" FOREIGN KEY ("leitorId") REFERENCES "BiblioLeitor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Emprestimo_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "Funcionario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Emprestimo_obraid_fkey" FOREIGN KEY ("obraid") REFERENCES "Obras" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Emprestimo_exemplarid_fkey" FOREIGN KEY ("exemplarid") REFERENCES "ObraExemplar" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

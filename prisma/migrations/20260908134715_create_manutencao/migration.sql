-- CreateTable
CREATE TABLE "manutencoes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "obraid" INTEGER NOT NULL,
    "descricaoServico" TEXT NOT NULL,
    "dataManutencao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valorCusto" REAL NOT NULL,
    CONSTRAINT "manutencoes_obraid_fkey" FOREIGN KEY ("obraid") REFERENCES "Obras" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

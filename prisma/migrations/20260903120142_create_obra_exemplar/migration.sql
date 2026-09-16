-- CreateTable
CREATE TABLE "ObraExemplar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_obra" INTEGER NOT NULL,
    "codigo_exemplar" TEXT NOT NULL,
    "estado_de_conservacao" TEXT NOT NULL,
    "statusExemplar" TEXT NOT NULL DEFAULT 'Disponivel',
    CONSTRAINT "ObraExemplar_id_obra_fkey" FOREIGN KEY ("id_obra") REFERENCES "Obras" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ObraExemplar_id_obra_key" ON "ObraExemplar"("id_obra");

-- CreateIndex
CREATE UNIQUE INDEX "ObraExemplar_codigo_exemplar_key" ON "ObraExemplar"("codigo_exemplar");

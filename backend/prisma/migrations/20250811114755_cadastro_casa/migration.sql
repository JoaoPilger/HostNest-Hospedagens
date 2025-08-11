/*
  Warnings:

  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "session" (
    "sid" TEXT NOT NULL,
    "sess" JSONB NOT NULL,
    "expire" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
);

-- CreateTable
CREATE TABLE "Casa" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT,
    "tipoImovel" TEXT NOT NULL,
    "comodos" INTEGER NOT NULL,
    "quartos" INTEGER NOT NULL,
    "banheiros" INTEGER NOT NULL,
    "vagasGaragem" INTEGER,
    "tamanhoM2" DOUBLE PRECISION NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "tipoPreco" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Casa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImovelFoto" (
    "id" SERIAL NOT NULL,
    "casaId" INTEGER NOT NULL,
    "caminho" TEXT NOT NULL,
    "ordem" INTEGER,
    "descricao" TEXT,

    CONSTRAINT "ImovelFoto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Casa" ADD CONSTRAINT "Casa_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImovelFoto" ADD CONSTRAINT "ImovelFoto_casaId_fkey" FOREIGN KEY ("casaId") REFERENCES "Casa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

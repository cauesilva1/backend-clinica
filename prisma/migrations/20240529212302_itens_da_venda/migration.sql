/*
  Warnings:

  - You are about to drop the column `QTD_Itens` on the `VeItensDaVenda` table. All the data in the column will be lost.
  - You are about to drop the column `cod_espec` on the `VeItensDaVenda` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "VeItensDaVenda" DROP COLUMN "QTD_Itens",
DROP COLUMN "cod_espec";

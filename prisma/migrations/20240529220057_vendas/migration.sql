/*
  Warnings:

  - You are about to drop the column `data` on the `VeVendas` table. All the data in the column will be lost.
  - You are about to drop the `VeItensDaVenda` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `Id_Procedimento` to the `VeVendas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Id_Profissional` to the `VeVendas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_agenda` to the `VeVendas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor` to the `VeVendas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "VeItensDaVenda" DROP CONSTRAINT "VeItensDaVenda_Id_Procedimento_fkey";

-- DropForeignKey
ALTER TABLE "VeItensDaVenda" DROP CONSTRAINT "VeItensDaVenda_Id_Profissional_fkey";

-- DropForeignKey
ALTER TABLE "VeItensDaVenda" DROP CONSTRAINT "VeItensDaVenda_Id_Vendas_fkey";

-- DropForeignKey
ALTER TABLE "VeItensDaVenda" DROP CONSTRAINT "VeItensDaVenda_id_agenda_fkey";

-- AlterTable
ALTER TABLE "VeVendas" DROP COLUMN "data",
ADD COLUMN     "Id_Procedimento" INTEGER NOT NULL,
ADD COLUMN     "Id_Profissional" INTEGER NOT NULL,
ADD COLUMN     "id_agenda" INTEGER NOT NULL,
ADD COLUMN     "valor" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "VeItensDaVenda";

-- AddForeignKey
ALTER TABLE "VeVendas" ADD CONSTRAINT "VeVendas_Id_Procedimento_fkey" FOREIGN KEY ("Id_Procedimento") REFERENCES "AgProcedimentos"("id_procedimento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VeVendas" ADD CONSTRAINT "VeVendas_Id_Profissional_fkey" FOREIGN KEY ("Id_Profissional") REFERENCES "AgProfissional"("id_profissional") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - Added the required column `data_fechamento` to the `AgAgenda` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AgAgenda" ADD COLUMN     "data_fechamento" TIMESTAMP(3) NOT NULL;

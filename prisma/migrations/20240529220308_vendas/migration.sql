/*
  Warnings:

  - Added the required column `forma_De_pagamento` to the `VeVendas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VeVendas" ADD COLUMN     "forma_De_pagamento" TEXT NOT NULL;

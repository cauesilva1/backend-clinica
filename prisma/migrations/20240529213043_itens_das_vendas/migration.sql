-- AlterTable
ALTER TABLE "VeItensDaVenda" ADD COLUMN     "status_pagamento" TEXT NOT NULL DEFAULT 'pendente';

-- AlterTable
ALTER TABLE "VeVendas" ADD COLUMN     "status_pagamento" TEXT NOT NULL DEFAULT 'pendente';

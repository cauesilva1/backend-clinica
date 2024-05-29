-- CreateTable
CREATE TABLE "AgCliente" (
    "cpf_cliente" TEXT NOT NULL,
    "nome_cliente" TEXT NOT NULL,
    "telefone" TEXT,
    "logradouro" TEXT,
    "numero" INTEGER,
    "bairro" TEXT,
    "cidade" TEXT,
    "uf" TEXT,
    "complemento" TEXT,
    "cep" TEXT,

    CONSTRAINT "AgCliente_pkey" PRIMARY KEY ("cpf_cliente")
);

-- CreateTable
CREATE TABLE "AgProfissional" (
    "id_profissional" SERIAL NOT NULL,
    "nome_profissional" TEXT NOT NULL,
    "cod_especialidade" INTEGER NOT NULL,

    CONSTRAINT "AgProfissional_pkey" PRIMARY KEY ("id_profissional")
);

-- CreateTable
CREATE TABLE "AgProcedimentos" (
    "id_procedimento" SERIAL NOT NULL,
    "procedimento" TEXT NOT NULL,
    "custo_total" DOUBLE PRECISION NOT NULL,
    "cod_especialidade" INTEGER NOT NULL,

    CONSTRAINT "AgProcedimentos_pkey" PRIMARY KEY ("id_procedimento")
);

-- CreateTable
CREATE TABLE "VeVendas" (
    "Id_Vendas" SERIAL NOT NULL,
    "CPF_Cliente" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VeVendas_pkey" PRIMARY KEY ("Id_Vendas")
);

-- CreateTable
CREATE TABLE "AgAgenda" (
    "id_agenda" SERIAL NOT NULL,
    "cpf_cliente" TEXT NOT NULL,
    "id_procedimento" INTEGER NOT NULL,
    "id_profissional" INTEGER NOT NULL,
    "data_abertura" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AgAgenda_pkey" PRIMARY KEY ("id_agenda")
);

-- CreateTable
CREATE TABLE "VeItensDaVenda" (
    "Id_Vendas" INTEGER NOT NULL,
    "QTD_Itens" INTEGER NOT NULL,
    "Id_Procedimento" INTEGER NOT NULL,
    "Id_Profissional" INTEGER NOT NULL,
    "cod_espec" INTEGER NOT NULL,
    "Forma_Pagamento" INTEGER NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "id_agenda" INTEGER NOT NULL,

    CONSTRAINT "VeItensDaVenda_pkey" PRIMARY KEY ("Id_Vendas","Id_Procedimento","Id_Profissional","id_agenda")
);

-- AddForeignKey
ALTER TABLE "VeVendas" ADD CONSTRAINT "VeVendas_CPF_Cliente_fkey" FOREIGN KEY ("CPF_Cliente") REFERENCES "AgCliente"("cpf_cliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgAgenda" ADD CONSTRAINT "AgAgenda_cpf_cliente_fkey" FOREIGN KEY ("cpf_cliente") REFERENCES "AgCliente"("cpf_cliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgAgenda" ADD CONSTRAINT "AgAgenda_id_procedimento_fkey" FOREIGN KEY ("id_procedimento") REFERENCES "AgProcedimentos"("id_procedimento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgAgenda" ADD CONSTRAINT "AgAgenda_id_profissional_fkey" FOREIGN KEY ("id_profissional") REFERENCES "AgProfissional"("id_profissional") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VeItensDaVenda" ADD CONSTRAINT "VeItensDaVenda_Id_Vendas_fkey" FOREIGN KEY ("Id_Vendas") REFERENCES "VeVendas"("Id_Vendas") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VeItensDaVenda" ADD CONSTRAINT "VeItensDaVenda_Id_Procedimento_fkey" FOREIGN KEY ("Id_Procedimento") REFERENCES "AgProcedimentos"("id_procedimento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VeItensDaVenda" ADD CONSTRAINT "VeItensDaVenda_Id_Profissional_fkey" FOREIGN KEY ("Id_Profissional") REFERENCES "AgProfissional"("id_profissional") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VeItensDaVenda" ADD CONSTRAINT "VeItensDaVenda_id_agenda_fkey" FOREIGN KEY ("id_agenda") REFERENCES "AgAgenda"("id_agenda") ON DELETE RESTRICT ON UPDATE CASCADE;

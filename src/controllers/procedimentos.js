"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerarProcedimentos = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Função para gerar procedimentos automaticamente
function gerarProcedimentos() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const procedimentos = [
                { procedimento: "Consulta", custo_total: 100.0, cod_especialidade: 123 },
                { procedimento: "Cirurgia", custo_total: 500.0, cod_especialidade: 456 },
                { procedimento: "Exame", custo_total: 50.0, cod_especialidade: 789 }
                // Adicione mais procedimentos conforme necessário
            ];
            const resultado = yield prisma.agProcedimentos.createMany({
                data: procedimentos,
            });
            console.log("Procedimentos criados:", resultado);
        }
        catch (error) {
            console.error("Erro ao criar procedimentos:", error);
        }
    });
}
exports.gerarProcedimentos = gerarProcedimentos;
gerarProcedimentos();

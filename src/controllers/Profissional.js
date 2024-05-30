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
exports.gerarProfissionais = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function gerarProfissionais() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const profissionais = [
                { nome_profissional: "Dr. João Pereira", cod_especialidade: 123 },
                { nome_profissional: "Dra. Maria Oliveira", cod_especialidade: 456 },
                { nome_profissional: "Dr. Carlos Santos", cod_especialidade: 789 }
                // Adicione mais profissionais conforme necessário
            ];
            const resultado = yield prisma.agProfissional.createMany({
                data: profissionais,
            });
            console.log("Profissionais criados:", resultado);
        }
        catch (error) {
            console.error("Erro ao criar profissionais:", error);
        }
    });
}
exports.gerarProfissionais = gerarProfissionais;
gerarProfissionais();

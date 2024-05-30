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
exports.RealizarPagamentos = exports.BuscarOneAgenda = exports.BuscarAgenda = exports.buscaCliente = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function buscaCliente(cpf_cliente) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const BuscarCliente = yield prisma.agCliente.findUnique({
                where: {
                    cpf_cliente,
                },
            });
            if (!BuscarCliente) {
                return ({ message: "Cliente não encontrado" });
            }
            return BuscarCliente;
        }
        catch (error) {
            console.error("Erro ao buscar cliente:", error);
        }
        finally {
            yield prisma.$disconnect(); // Fechar a conexão com o banco de dados
        }
    });
}
exports.buscaCliente = buscaCliente;
function BuscarAgenda(cpf_cliente) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataBusca = new Date();
        try {
            // Buscar agendas com a data de fechamento vazia
            const agendasFechamentoVazio = yield prisma.agAgenda.findMany({
                where: {
                    cpf_cliente,
                    data_fechamento: null
                },
                orderBy: {
                    data_abertura: 'asc' // Ordenar pela data de abertura mais antiga
                }
            });
            if (!agendasFechamentoVazio.length) {
                return { message: "Agenda não encontrada" };
            }
            return agendasFechamentoVazio;
            // Retornar as agendas com a data de abertura mais antiga
        }
        catch (error) {
            console.error("Erro ao buscar agenda:", error);
            throw new Error("Erro ao buscar agenda");
        }
        finally {
            yield prisma.$disconnect(); // Fechar a conexão com o banco de dados
        }
    });
}
exports.BuscarAgenda = BuscarAgenda;
function BuscarOneAgenda(cpf_cliente) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataBusca = new Date();
        try {
            // Buscar agendas com a data de fechamento vazia
            const agendasFechamentoVazio = yield prisma.agAgenda.findFirst({
                where: {
                    cpf_cliente,
                    data_fechamento: null
                },
                orderBy: {
                    data_abertura: 'asc' // Ordenar pela data de abertura mais antiga
                }
            });
            return agendasFechamentoVazio;
            // Retornar as agendas com a data de abertura mais antiga
        }
        catch (error) {
            console.error("Erro ao buscar agenda:", error);
            throw new Error("Erro ao buscar agenda");
        }
        finally {
            yield prisma.$disconnect(); // Fechar a conexão com o banco de dados
        }
    });
}
exports.BuscarOneAgenda = BuscarOneAgenda;
function RealizarPagamentos(formaPagamento, cpfCliente) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        try {
            // Encontrar o ID da agenda com base no CPF do cliente
            const agenda = yield prisma.agAgenda.findFirst({
                where: {
                    cpf_cliente: cpfCliente,
                    data_fechamento: null
                },
                orderBy: {
                    data_abertura: 'asc'
                }
            });
            if (!agenda) {
                console.error('Agenda não encontrada para este cliente.');
            }
            const consulta = yield BuscarOneAgenda(cpfCliente);
            // Buscar informações relacionadas
            const cliente = yield prisma.agCliente.findUnique({
                where: { cpf_cliente: cpfCliente }
            });
            //pegar procedimento com base na agenda
            const procedimento = yield prisma.agProcedimentos.findUnique({
                where: { id_procedimento: consulta === null || consulta === void 0 ? void 0 : consulta.id_procedimento }
            });
            //pegar profissional com base na agenda
            const profissional = yield prisma.agProfissional.findUnique({
                where: { id_profissional: consulta === null || consulta === void 0 ? void 0 : consulta.id_profissional }
            });
            const AtualizarVenda = yield prisma.veVendas.create({
                data: {
                    CPF_Cliente: (_a = cliente === null || cliente === void 0 ? void 0 : cliente.cpf_cliente) !== null && _a !== void 0 ? _a : '', // Se cliente for undefined, atribui uma string vazia
                    status_pagamento: "PAGO",
                    forma_De_pagamento: formaPagamento,
                    Id_Procedimento: (_b = procedimento === null || procedimento === void 0 ? void 0 : procedimento.id_procedimento) !== null && _b !== void 0 ? _b : 0, // Se procedimento for undefined, atribui 0
                    Id_Profissional: (_c = profissional === null || profissional === void 0 ? void 0 : profissional.id_profissional) !== null && _c !== void 0 ? _c : 0, // Se profissional for undefined, atribui 0
                    valor: (_d = procedimento === null || procedimento === void 0 ? void 0 : procedimento.custo_total) !== null && _d !== void 0 ? _d : 0, // Se custo_total for undefined, atribui 0
                    id_agenda: (_e = consulta === null || consulta === void 0 ? void 0 : consulta.id_agenda) !== null && _e !== void 0 ? _e : 0, // Se consulta for undefined, atribui 0
                }
            });
            // const data ={
            //     CPF_Cliente : cliente?.cpf_cliente ?? '', // Se cliente for undefined, atribui uma string vazia
            //     status_pagamento : "PAGO",
            //     forma_De_pagamento : formaPagamento,
            //     Id_Procedimento : procedimento?.id_procedimento ?? 0, // Se procedimento for undefined, atribui 0
            //     Id_Profissional : profissional?.id_profissional ?? 0, // Se profissional for undefined, atribui 0
            //     valor : procedimento?.custo_total ?? 0, // Se custo_total for undefined, atribui 0
            //     id_agenda: consulta?.id_agenda ?? 0, // Se consulta for undefined, atribui 0
            //   }
            // ** adicionar data-fechamento **
            // Retornar a venda atualizada com informações relacionadas
            return AtualizarVenda;
        }
        catch (error) {
            console.error('Erro ao adicionar forma de pagamento:', error);
        }
    });
}
exports.RealizarPagamentos = RealizarPagamentos;

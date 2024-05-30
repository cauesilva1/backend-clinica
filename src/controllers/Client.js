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
exports.RealizarPagamento = exports.buscarAgenda = exports.buscarCliente = exports.CriarCliente = void 0;
const client_1 = require("@prisma/client");
const cliente_1 = require("../services/cliente");
const prisma = new client_1.PrismaClient();
function CriarCliente(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { cpf_cliente, nome_cliente, telefone, logradouro, numero, bairro, cidade, uf, complemento, cep, } = req.body;
            const clienteCriado = yield prisma.agCliente.create({
                data: {
                    cpf_cliente,
                    nome_cliente,
                    telefone,
                    logradouro,
                    numero,
                    bairro,
                    cidade,
                    uf,
                    complemento,
                    cep,
                },
            });
            res
                .status(200)
                .json({ message: "Usuário criado com sucesso", user: clienteCriado });
            res;
        }
        catch (error) {
            console.error("Erro ao criar cliente:", error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.CriarCliente = CriarCliente;
function buscarCliente(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const cliente = yield (0, cliente_1.buscaCliente)(req.body.cpf_cliente);
        console.log("Cliente:", cliente);
        res
            .status(200)
            .json({
            Cliente: cliente,
        });
    });
}
exports.buscarCliente = buscarCliente;
function buscarAgenda(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const Agenda = yield (0, cliente_1.BuscarAgenda)(req.body.cpf_cliente);
        res
            .status(200)
            .json({ agenda: Agenda });
    });
}
exports.buscarAgenda = buscarAgenda;
function RealizarPagamento(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { formaPagamento, cpfCliente } = req.body;
        const VendaRealizada = yield (0, cliente_1.RealizarPagamentos)(formaPagamento, cpfCliente);
        console.log("VendaRealizada:", VendaRealizada);
        res.status(200).json(VendaRealizada);
    });
}
exports.RealizarPagamento = RealizarPagamento;

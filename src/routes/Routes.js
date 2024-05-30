"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const Client_1 = require("../controllers/Client");
exports.router = express_1.default.Router();
exports.router.get('/user', Client_1.buscarCliente);
exports.router.get('/AgendaClient', Client_1.buscarAgenda);
// router.post('/createUser', CriarCliente);
exports.router.post('/RealizarPagamento', Client_1.RealizarPagamento);
// router.post('/gerarProfissionais', gerarProfissionais);
// router.post('/gerarProcedimentos', gerarProcedimentos);
// router.post('/gerarAgenda', gerarAgendas);

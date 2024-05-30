import express, { Request, Response } from 'express';
import { CriarCliente, buscarCliente, buscarAgenda, RealizarPagamento } from '../controllers/Client';
import { gerarProfissionais } from '../controllers/Profissional';
import { gerarProcedimentos } from '../controllers/procedimentos';
import { gerarAgendas } from '../controllers/gerarAgenda';
import { gerarRelatorio, buscarRelatorioPorCpf } from '../controllers/Relatorio';
export const router = express.Router();



router.get('/user', buscarCliente);

router.get('/AgendaClient', buscarAgenda);

router.get('/Relatorio', gerarRelatorio);

router.get('/RelatorioCpf', buscarRelatorioPorCpf);

// -----------------------------------------------------------------------

// router.post('/createUser', CriarCliente);

router.post('/RealizarPagamento', RealizarPagamento);


// router.post('/gerarProfissionais', gerarProfissionais);
// router.post('/gerarProcedimentos', gerarProcedimentos);
// router.post('/gerarAgenda', gerarAgendas);


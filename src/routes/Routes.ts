import express, { Request, Response } from 'express';
import { CriarCliente, buscarCliente, buscarAgenda, RealizarPagamento } from '../controllers/Client';
import { gerarProfissionais } from '../controllers/Profissional';
import { gerarProcedimentos } from '../controllers/procedimentos';
import { gerarAgendas } from '../controllers/gerarAgenda';
export const router = express.Router();



router.get('/user', buscarCliente);

router.get('/AgendaClient', buscarAgenda);

// router.post('/createUser', CriarCliente);


router.post('/RealizarPagamento', RealizarPagamento);


// router.post('/gerarProfissionais', gerarProfissionais);
// router.post('/gerarProcedimentos', gerarProcedimentos);
// router.post('/gerarAgenda', gerarAgendas);


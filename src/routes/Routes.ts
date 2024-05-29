import express, { Request, Response } from 'express';
import { criarAgCliente, buscarAgCliente, buscarAgenda } from '../controllers/Client';
import { gerarProfissionais } from '../controllers/Profissional';
import { gerarProcedimentos } from '../controllers/procedimentos';
import { gerarAgendas } from '../controllers/gerarAgenda';
export const router = express.Router();



router.get('/user', buscarAgCliente);

router.get('/AgendaClient', buscarAgenda);

router.post('/createUser', criarAgCliente);


// router.post('/gerarProfissionais', gerarProfissionais);
// router.post('/gerarProcedimentos', gerarProcedimentos);
// router.post('/gerarAgenda', gerarAgendas);


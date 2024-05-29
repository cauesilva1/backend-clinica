import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();


export async function gerarAgendas() {
    try {
      const agendas = [
        { cpf_cliente: "12345678900", id_procedimento: 1, id_profissional: 1, data_abertura: new Date() },
      ];
  
      const resultado = await prisma.agAgenda.createMany({
        data: agendas,
      });
  
      console.log("Agendas criadas:", resultado);
    } catch (error) {
      console.error("Erro ao criar agendas:", error);
    } finally {
      await prisma.$disconnect();
    }
  }

  gerarAgendas();
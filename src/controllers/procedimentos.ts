import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();


// Função para gerar procedimentos automaticamente
export async function gerarProcedimentos() {
    try {
      const procedimentos = [
        { procedimento: "Consulta", custo_total: 100.0, cod_especialidade: 123 },
        { procedimento: "Cirurgia", custo_total: 500.0, cod_especialidade: 456 },
        { procedimento: "Exame", custo_total: 50.0, cod_especialidade: 789 }
        // Adicione mais procedimentos conforme necessário
      ];
  
      const resultado = await prisma.agProcedimentos.createMany({
        data: procedimentos,
      });
  
      console.log("Procedimentos criados:", resultado);
    } catch (error) {
      console.error("Erro ao criar procedimentos:", error);
    }
  }

  gerarProcedimentos();
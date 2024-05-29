import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

interface NovoProfissional {
    nome_profissional: string;
    cod_especialidade: number;
  }
  
export async function gerarProfissionais() {
    try {
      const profissionais = [
        { nome_profissional: "Dr. João Pereira", cod_especialidade: 123 },
        { nome_profissional: "Dra. Maria Oliveira", cod_especialidade: 456 },
        { nome_profissional: "Dr. Carlos Santos", cod_especialidade: 789 }
        // Adicione mais profissionais conforme necessário
      ];
  
      const resultado = await prisma.agProfissional.createMany({
        data: profissionais,
      });
  
      console.log("Profissionais criados:", resultado);
    } catch (error) {
      console.error("Erro ao criar profissionais:", error);
    }
  }

  gerarProfissionais();
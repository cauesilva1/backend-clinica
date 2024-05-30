import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();


export async function buscaCliente(cpf_cliente: string) {

    try{
        const BuscarCliente = await prisma.agCliente.findUnique({
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
        await prisma.$disconnect(); // Fechar a conexão com o banco de dados
    }
}

export async function BuscarAgenda(cpf_cliente: string) {
    const dataBusca = new Date();

    try {
        // Buscar agendas com a data de fechamento vazia
        const agendasFechamentoVazio = await prisma.agAgenda.findMany({
            where: {
                cpf_cliente,
                data_fechamento: null
            },
            orderBy: {
                data_abertura: 'asc' // Ordenar pela data de abertura mais antiga
            }
        });

        if (!agendasFechamentoVazio.length ) {
            return { message: "Agenda não encontrada" };
        }

        return agendasFechamentoVazio; 
        // Retornar as agendas com a data de abertura mais antiga
    } catch (error) {

        console.error("Erro ao buscar agenda:", error);

        throw new Error("Erro ao buscar agenda");

    } finally {
        await prisma.$disconnect(); // Fechar a conexão com o banco de dados
    }
}

export async function BuscarOneAgenda(cpf_cliente: string) {
    const dataBusca = new Date();

    try {
        // Buscar agendas com a data de fechamento vazia
        const agendasFechamentoVazio = await prisma.agAgenda.findFirst({
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
    } catch (error) {

        console.error("Erro ao buscar agenda:", error);

        throw new Error("Erro ao buscar agenda");

    } finally {
        await prisma.$disconnect(); // Fechar a conexão com o banco de dados
    }
}

export async function RealizarPagamentos(formaPagamento: string, cpfCliente: string) {

    try {

        // Encontrar o ID da agenda com base no CPF do cliente
        const agenda = await prisma.agAgenda.findFirst({
          where: {
              cpf_cliente: cpfCliente,
              data_fechamento: null
          },
          orderBy: {
            data_abertura: 'asc' 
        }
        });
    
        if (!agenda) {
          console.error('Agenda não encontrada para este cliente.' );
        }
    
        const consulta = await BuscarOneAgenda(cpfCliente)
    
    
        // Buscar informações relacionadas
        const cliente = await prisma.agCliente.findUnique({
          where: { cpf_cliente: cpfCliente }
        });
    
        //pegar procedimento com base na agenda
        const procedimento = await prisma.agProcedimentos.findUnique({
          where: { id_procedimento: consulta?.id_procedimento }
        });
    
        //pegar profissional com base na agenda
        const profissional = await prisma.agProfissional.findUnique({
          where: { id_profissional: consulta?.id_profissional }
        });
    
        const AtualizarVenda = await prisma.veVendas.create({
          data: {
            CPF_Cliente : cliente?.cpf_cliente ?? '', // Se cliente for undefined, atribui uma string vazia
            status_pagamento : "PAGO",
            forma_De_pagamento : formaPagamento,
            Id_Procedimento : procedimento?.id_procedimento ?? 0, // Se procedimento for undefined, atribui 0
            Id_Profissional : profissional?.id_profissional ?? 0, // Se profissional for undefined, atribui 0
            valor : procedimento?.custo_total ?? 0, // Se custo_total for undefined, atribui 0
            id_agenda: consulta?.id_agenda ?? 0, // Se consulta for undefined, atribui 0
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
        return AtualizarVenda

      } catch (error) {
        console.error('Erro ao adicionar forma de pagamento:', error);
      }

}

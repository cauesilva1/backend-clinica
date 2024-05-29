import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export async function criarAgCliente(req: Request, res: Response) {
  try {
    const {
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
    } = req.body;

    const clienteCriado = await prisma.agCliente.create({
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
    res
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function buscarAgCliente(req: Request, res: Response) {
  try {
    const { cpf_cliente } = req.body;

    const BuscarCliente = await prisma.agCliente.findUnique({
      where: {
        cpf_cliente,
      },
    });

    if (!BuscarCliente) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }

    console.log("Cliente:", BuscarCliente);

    res
      .status(200)
      .json({ message: "Usuário encontrado com sucesso", user: BuscarCliente });
  } catch (error) {
    console.error("Erro ao buscar cliente:", error);
  } finally {
    await prisma.$disconnect(); // Fechar a conexão com o banco de dados
  }
}

export async function buscarAgenda(req: Request, res: Response) {
  try {
    const { cpf_cliente } = req.body;

    const dataBusca = new Date();

    const BuscarAgenda = await prisma.agAgenda.findMany({
      where: {
        cpf_cliente,
        data_abertura: {
          lte: dataBusca,
        },
      },
    }); 





    console.log("Agenda:", BuscarAgenda);

    res
      .status(200)
      .json({ message: "Agenda encontrada com sucesso", agenda: BuscarAgenda });
  } catch (error) {}
}

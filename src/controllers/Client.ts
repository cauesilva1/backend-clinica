import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { buscaCliente, BuscarAgenda, RealizarPagamentos } from "../services/cliente";
const prisma = new PrismaClient();

export async function CriarCliente(req: Request, res: Response) {
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
    res;
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function buscarCliente(req: Request, res: Response) {
    const cliente = await buscaCliente(req.body.cpf_cliente);

    console.log("Cliente:", cliente);

    res
      .status(200)
      .json({
        Cliente: cliente,
      });

} 
  
export async function buscarAgenda(req: Request, res: Response) {

    const Agenda = await BuscarAgenda(req.body.cpf_cliente);

    res
      .status(200)
      .json({agenda: Agenda });

}

export async function RealizarPagamento(req: Request, res: Response) {
  const { formaPagamento, cpfCliente } = req.body;


  const VendaRealizada = await RealizarPagamentos(formaPagamento, cpfCliente);

  console.log("VendaRealizada:", VendaRealizada);

  res.status(200).json(VendaRealizada);

}


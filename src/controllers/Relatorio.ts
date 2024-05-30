import { PrismaClient } from "@prisma/client";
import { error } from "console";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export async function gerarRelatorio(req: Request, res: Response) {
  try {
    const Relatorio = await prisma.veVendas.findMany();

    res.status(200).json({ Mensage: "Relatorio Gerado", Relatorio: Relatorio });
  } catch {
    res.status(500).json({ error: "Erro ao Buscar Relatorio" });
    console.error("Erro ao Buscar Relatorio:", error);
  }
}

export async function buscarRelatorioPorCpf(req: Request, res: Response) {
    
  const { cpf_cliente } = req.body;

  try {
    const Relatorio = await prisma.veVendas.findMany({
      where: {
        CPF_Cliente: req.body.cpf_cliente,
      },
    });

    res.status(200).json({ Mensage: "Relatorio Gerado", Relatorio: Relatorio });
  } catch {
    res.status(500).json({ error: "Erro ao Buscar Relatorio" });
    console.error("Erro ao Buscar Relatorio:", error);
  }
}

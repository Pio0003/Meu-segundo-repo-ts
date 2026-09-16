import { Request, Response } from 'express';
import * as clienteService from '../services/leitor.service';


export async function criar(req: Request, res: Response): Promise<void> {
  const { nome, email, senha, matricula, possuiPendencia } = req.body;

  const cliente = await clienteService.criarCliente({ nome, email, senha, matricula, possuiPendencia });


  res.status(201).json(cliente);
}

export async function listar(_req: Request, res: Response): Promise<void> {
  const clientes = await clienteService.listarClientes();
  res.status(200).json(clientes);
}

export async function buscarPorId(req: Request, res: Response): Promise<void> {

  const id = Number(req.params.id);

  const cliente = await clienteService.buscarClientePorId(id);

  res.status(200).json(cliente);
}
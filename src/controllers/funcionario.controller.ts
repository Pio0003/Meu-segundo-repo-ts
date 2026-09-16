import { Request, Response } from 'express';
import * as funcionarioService from '../services/funcionario.service';


export async function criar(req: Request, res: Response): Promise<void> {
  const { nome, email, senha, cargo } = req.body;

  const funcionario = await funcionarioService.criarFuncionario({ nome, cargo, email, senha });


  res.status(201).json(funcionario);
}

export async function listar(_req: Request, res: Response): Promise<void> {
  const funcionarios = await funcionarioService.listarFuncionario();
  res.status(200).json(funcionarios);
}

export async function buscarPorId(req: Request, res: Response): Promise<void> {

  const id = Number(req.params.id);

  const funcionario = await funcionarioService.buscarFuncionarioPorId(id);

  res.status(200).json(funcionario);
}
import { Request, Response } from 'express';
import * as emprestimoService from '../services/emprestimo.service';

export async function abrir(req: Request, res: Response): Promise<void> {
  const leitorId = req.user!.id;
  const { obraId, dataPrevistaDevolucao, funcionarioId, exemplarid } = req.body;

  const novoEmprestimo = await emprestimoService.CriarEmprestimo(leitorId, { obraId, dataPrevistaDevolucao, funcionarioId, exemplarid });

  res.status(201).json(novoEmprestimo);
}

export async function listar(req: Request, res: Response): Promise<void> {
  const leitorId = req.user!.id;
  const emprestimo = await emprestimoService.listarEmprestimoDoleitor(leitorId);
  res.status(200).json(emprestimo);
}

export async function buscarPorId(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const leitorId = req.user!.id;
  const emprestimo = await emprestimoService.buscarEmprestimoPorId(id, leitorId);
  res.status(200).json(emprestimo);
}

export async function devolver(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const leitorId = req.user!.id;
  const resultado = await emprestimoService.devolverObra(id, leitorId);
  res.status(200).json({ mensagem: 'Obra devolvida com sucesso.', emprestimo: resultado });
}

export async function cancelar(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const leitorId = req.user!.id;
  const resultado = await emprestimoService.cancelarEmprestimo(id, leitorId);
  res.status(200).json({ mensagem: 'Emprestimo cancelado com sucesso.', emprestimo: resultado });
}
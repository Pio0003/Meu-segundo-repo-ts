import { Request, Response } from 'express';
import * as obraService from '../services/obra.service';

export async function criar(req: Request, res: Response): Promise<void> {
  const { categoriaId, autor, titulo, editora, genero } = req.body;
  const obraCriada = await obraService.criarObra({ categoriaId, autor, titulo, editora, genero });
  res.status(201).json(obraCriada);
}

export async function listar(req: Request, res: Response): Promise<void> {
  // req.query: parâmetros de query string (o que vem depois do "?" na URL),
  // ex.: /Obras?disponibilidade=Disponivel.
  const disponibilidade = req.query.disponibilidade as string | undefined;
  const obras = await obraService.listarObras(disponibilidade);
  res.status(200).json(obras);
}

export async function buscarPorId(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const obra = await obraService.buscarObrasPorId(id);
  res.status(200).json(obra);
}

export async function atualizar(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const obraAtualizado = await obraService.atualizarObra(id, req.body);
  res.status(200).json(obraAtualizado);
}
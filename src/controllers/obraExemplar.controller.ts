import { Request, Response } from 'express';
import * as obraExemplarService from '../services/obraExemplar.service';

export async function criar(req: Request, res: Response): Promise<void> {
  const { id, id_obra, codigo_exemplar, estado_de_conservacao } = req.body;
  const adicionarExemplar = await obraExemplarService.adicionarExemplar({ id, id_obra, codigo_exemplar, estado_de_conservacao });
  res.status(201).json(adicionarExemplar);
}

export async function listar(req: Request, res: Response): Promise<void> {

  const status = req.query.statusExemplar as string | undefined;
  const obraExemplar = await obraExemplarService.listarExemplares(status);
  res.status(200).json(obraExemplar);
}

export async function buscarPorId(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const obraExemplar = await obraExemplarService.buscarExemplarPorId(id);
  res.status(200).json(obraExemplar);
}

export async function atualizar(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const exemplarAtualizado = await obraExemplarService.atualizarExemplares(id, req.body);
  res.status(200).json(exemplarAtualizado);
}
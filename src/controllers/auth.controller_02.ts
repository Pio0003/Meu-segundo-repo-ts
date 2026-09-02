import { Request, Response } from 'express';
import * as authService_02 from '../services/auth.service_02';

export async function login(req: Request, res: Response): Promise<Response> {
  const { email, senha } = req.body;
  const resultado = await authService_02.login({ email, senha });
  return res.status(200).json(resultado);
}
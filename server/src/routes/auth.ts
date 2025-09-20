console.log("Iniciando rota AUTH...");

import { Router, Request, Response } from 'express';
console.log("Express importado com sucesso");

import { AppDataSource } from '../data-source.js';
console.log("DataSource importado com sucesso");

import { User } from '../entities/User.js';
console.log("User entity importada com sucesso");

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

console.log("Outros módulos importados OK");

export const authRouter = Router();

console.log("Router criado com sucesso");


authRouter.post('/register', async (req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(User);
  const { email, nome, senha } = req.body;

  if (!email || !nome || !senha) {
    return res.status(400).json({ error: 'Dados obrigatórios' });
  }

  const existing = await repo.findOne({ where: { email } });
  if (existing) {
    return res.status(400).json({ error: 'Email já cadastrado' });
  }

  const senhaHash = await bcrypt.hash(senha, 10);
  const user = repo.create({ email, nome, senhaHash });
  await repo.save(user);

  return res.status(201).json({ id: user.id, email: user.email, nome: user.nome });
});

authRouter.post('/login', async (req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(User);
  const { email, senha } = req.body;

  const user = await repo.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }

  const ok = await bcrypt.compare(senha, user.senhaHash);
  if (!ok) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET || 'dev-secret',
    { expiresIn: '24h' }
  );

  return res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      nome: user.nome
    }
  });
});

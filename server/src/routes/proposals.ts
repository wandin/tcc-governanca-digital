import { Router } from 'express';
import { AppDataSource } from '../data-source.js';
import { Proposal } from '../entities/Proposal.js';
import { authMiddleware } from '../middleware/auth.js';

export const proposalsRouter = Router();

proposalsRouter.get('/', async (_req, res) => {
  const repo = AppDataSource.getRepository(Proposal);
  const list = await repo.find({ order: { criadaEm: 'DESC' } });
  res.json(list);
});

proposalsRouter.post('/', authMiddleware, async (req, res) => {
  const { titulo, descricao, sessaoId } = req.body;
  if (!titulo || !descricao) return res.status(400).json({ error: 'Título e descrição são obrigatórios' });
  const repo = AppDataSource.getRepository(Proposal);
  const proposal = repo.create({ titulo, descricao, sessaoId: sessaoId || null });
  await repo.save(proposal);
  res.status(201).json(proposal);
});

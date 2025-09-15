import { Router } from 'express';
import crypto from 'crypto';
import { AppDataSource } from '../data-source.js';
import { Vote, EscolhaVoto } from '../entities/Vote.js';
import { Proposal } from '../entities/Proposal.js';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';
import { registrarTransacao } from '../services/ledger.js';
import { Audit } from '../entities/Audit.js';

export const votesRouter = Router();

votesRouter.post('/:propostaId', authMiddleware, async (req: AuthRequest, res) => {
  const { propostaId } = req.params;
  const { escolha } = req.body as { escolha: EscolhaVoto };

  if (!['SIM','NAO','ABSTENCAO'].includes(escolha)) {
    return res.status(400).json({ error: 'Escolha inválida' });
  }

  const propRepo = AppDataSource.getRepository(Proposal);
  const proposal = await propRepo.findOne({ where: { id: propostaId } });
  if (!proposal) return res.status(404).json({ error: 'Proposta não encontrada' });

  // Anonimização: hash do userId com salt fixo do sistema (apenas protótipo)
  const salt = 'salt-demonstracao';
  const hashEleitor = crypto.createHash('sha256').update((req.userId || '') + salt).digest('hex');

  const voteRepo = AppDataSource.getRepository(Vote);
  const existing = await voteRepo.findOne({ where: { propostaId, hashEleitor } });
  if (existing) return res.status(400).json({ error: 'Usuário já votou nesta proposta' });

  const vote = voteRepo.create({ propostaId, proposta: proposal, hashEleitor, escolha });
  await voteRepo.save(vote);

  // Registrar em "ledger" (stub) e auditar
  const txId = await registrarTransacao({ tipo: 'VOTO', propostaId, hashEleitor, escolha, ts: Date.now() });
  vote.txBlockchainId = txId;
  await voteRepo.save(vote);

  const auditRepo = AppDataSource.getRepository(Audit);
  const audit = auditRepo.create({
    entidade: 'Voto',
    acao: 'REGISTRAR_VOTO',
    dadosHash: crypto.createHash('sha256').update(JSON.stringify({ propostaId, hashEleitor, escolha })).digest('hex'),
    txBlockchainId: txId,
  });
  await auditRepo.save(audit);

  res.status(201).json({ id: vote.id, propostaId, escolha, txBlockchainId: txId });
});

votesRouter.get('/resultado/:propostaId', async (req, res) => {
  const { propostaId } = req.params;
  const repo = AppDataSource.getRepository(Vote);
  const votos = await repo.find({ where: { propostaId } });

  const contagem = { SIM: 0, NAO: 0, ABSTENCAO: 0 };
  for (const v of votos) {
    contagem[v.escolha] += 1;
  }
  res.json({ propostaId, total: votos.length, contagem });
});

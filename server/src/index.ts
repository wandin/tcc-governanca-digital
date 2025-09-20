console.log("🔹 index.ts iniciado");

import 'dotenv/config';
import express from 'express';
import cors from 'cors';


import { AppDataSource } from './data-source.js';
import { authRouter } from './routes/auth.js';
import { proposalsRouter } from './routes/proposals.js';
import { votesRouter } from './routes/votes.js';

console.log('Iniciando aplicação...');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/auth', authRouter);
app.use('/proposals', proposalsRouter);
app.use('/votes', votesRouter);

const PORT = process.env.PORT || 3000;

console.log('Tentando inicializar datasource...');

AppDataSource.initialize()
  .then(() => {
    console.log('DataSource inicializado com sucesso!');
    app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
  })
  .catch((err) => {
    console.error('Erro ao inicializar DataSource:', err);
    process.exit(1);
  });
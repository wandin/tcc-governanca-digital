# Sistema de Governança Digital Participativa — MVP (API)

Este repositório contém um **MVP funcional** do backend descrito no TCC:
- Node.js + TypeScript + Express
- TypeORM + PostgreSQL
- JWT para autenticação
- Stub de ledger (pode ser substituído por Hyperledger Fabric)
- Docker Compose para subir tudo rapidamente

## Requisitos
- Docker + Docker Compose (recomendado)
- Alternativamente: Node 20+, PostgreSQL 15

## Executar com Docker (recomendado)
```bash
docker compose up
```
- API: http://localhost:3000
- Adminer (GUI do banco): http://localhost:8080 (server: db, user: postgres, pass: postgres, db: governanca)

## Variáveis de ambiente
Copie `.env.example` para `.env` na pasta `server` se for rodar fora do Docker.

## Rotas principais
- **Saúde**
  - `GET /health`
- **Autenticação**
  - `POST /auth/register` { email, nome, senha }
  - `POST /auth/login` { email, senha } → `{ token }`
- **Propostas**
  - `GET /proposals`
  - `POST /proposals` (Autenticado via `Authorization: Bearer <token>`)
- **Votos**
  - `POST /votes/:propostaId` { escolha: "SIM" | "NAO" | "ABSTENCAO" } (Autenticado)
  - `GET /votes/resultado/:propostaId`

## Observações
- `synchronize: true` está habilitado no TypeORM **apenas para protótipo**.
- A integração de ledger é um **stub** em `src/services/ledger.ts`. Troque por Hyperledger Fabric SDK ao evoluir.
- O voto é anonimizado com `hashEleitor` (derivado do userId + salt). Em produção, utilize salting forte / KDF + separação de domínios.

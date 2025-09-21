// src/types.ts
export interface User {
  id: string;
  email: string;
  nome: string;
}

export interface Proposal {
  id: string;
  titulo: string;
  descricao: string;
  criadaEm: string;
}

export interface Vote {
  id: string;
  propostaId: string;
  hashEleitor: string;
  escolha: 'SIM' | 'NAO' | 'ABSTENCAO';
}
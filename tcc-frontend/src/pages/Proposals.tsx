// src/pages/Proposals.tsx
import { useEffect, useState } from 'react';
import api from '../services/api';
import type { Proposal } from '../types';

export default function Proposals() {
  const [proposals, setProposals] = useState<Proposal[]>([]);

  useEffect(() => {
    const fetchProposals = async () => {
      const response = await api.get('/proposals');
      setProposals(response.data);
    };
    fetchProposals();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Propostas</h2>
      <ul className="space-y-2">
        {proposals.map((p) => (
          <li key={p.id} className="border p-4 rounded bg-white shadow">
            <h3 className="font-bold">{p.titulo}</h3>
            <p>{p.descricao}</p>
            <small className="text-gray-500">
              Criada em: {new Date(p.criadaEm).toLocaleDateString()}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}

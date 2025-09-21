// src/pages/Vote.tsx
import { useState } from 'react';
import api from '../services/api';

export default function Vote() {
  const [propostaId, setPropostaId] = useState('');
  const [escolha, setEscolha] = useState('SIM');

  const handleVote = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    await api.post(
      '/votes',
      { propostaId, escolha, hashEleitor: '123456' },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert('Voto registrado com sucesso!');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleVote} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Votar</h2>
        <input
          type="text"
          placeholder="ID da Proposta"
          className="border p-2 w-full mb-4"
          value={propostaId}
          onChange={(e) => setPropostaId(e.target.value)}
        />
        <select
          className="border p-2 w-full mb-4"
          value={escolha}
          onChange={(e) => setEscolha(e.target.value)}
        >
          <option value="SIM">Sim</option>
          <option value="NAO">Não</option>
          <option value="ABSTENCAO">Abstenção</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Votar
        </button>
      </form>
    </div>
  );
}

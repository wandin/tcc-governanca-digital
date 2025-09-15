// Stub de ledger para protótipo.
// Em produção, substitua por integração com Hyperledger Fabric SDK.
import crypto from 'crypto';

export async function registrarTransacao(payload: object): Promise<string> {
  // Simula o envio para a ledger e retorna um ID de transação (hash)
  const json = JSON.stringify(payload);
  const hash = crypto.createHash('sha256').update(json + Date.now()).digest('hex');
  // Aqui poderíamos persistir em arquivo local como mock, se necessário.
  return hash;
}

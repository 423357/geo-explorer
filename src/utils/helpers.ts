import type { RespostaComando } from '../types/index.js';

export function criarResposta(dados: unknown): RespostaComando {
  return {
    sucesso: true,
    dados,
    timestamp: new Date().toISOString(),
  };
}

export function criarErro(mensagem: string): RespostaComando {
  return {
    sucesso: false,
    erro: mensagem,
    timestamp: new Date().toISOString(),
  };
}

export function validarTecnologia(tecnologia: string): boolean {
  const tecnologiasValidas = ['java', 'typescript', 'python', 'javascript', 'go', 'rust', 'csharp'];
  return tecnologiasValidas.includes(tecnologia.toLowerCase());
}

export function validarNivel(nivel: string): boolean {
  return ['basico', 'intermediario', 'avancado'].includes(nivel.toLowerCase());
}

export function sanitizarNome(nome: string): string {
  return nome.trim().replace(/[<>"/\\|?*]/g, '').substring(0, 100);
}

export function gerarTimestamp(): string {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

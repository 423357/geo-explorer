// Tipos centrais do IBM Bob Lab MCP

export interface Trilha {
  id: string;
  tecnologia: string;
  titulo: string;
  nivel: NivelTrilha;
  duracaoHoras: number;
  modulos: Modulo[];
}

export interface Modulo {
  id: string;
  titulo: string;
  descricao: string;
  duracaoHoras: number;
  ordem: number;
}

export interface Aluno {
  id: string;
  nome: string;
  email: string;
  trilhasInscritas: string[];
}

export interface Desafio {
  id: string;
  titulo: string;
  descricao: string;
  nivel: NivelDesafio;
  tecnologia: string;
  enunciado: string;
  exemplosEntrada: string[];
  exemplosSaida: string[];
}

export interface Certificado {
  id: string;
  alunoNome: string;
  trilha: string;
  dataEmissao: string;
  codigoValidacao: string;
  cargaHoraria: number;
}

export type NivelTrilha = 'iniciante' | 'intermediario' | 'avancado';
export type NivelDesafio = 'basico' | 'intermediario' | 'avancado';

export interface RespostaComando {
  sucesso: boolean;
  dados?: unknown;
  erro?: string;
  timestamp: string;
}

// Tipos centrais do IBM Bob Lab MCP Server

export interface Trilha {
  id: string;
  tecnologia: string;
  titulo: string;
  nivel: NivelTrilha;
  duracaoHoras: number;
  xp: number;
  badges: string[];
  modulos: Modulo[];
}

export interface Modulo {
  id: string;
  titulo: string;
  descricao: string;
  duracaoHoras: number;
  ordem: number;
}

export interface Desafio {
  id: string;
  titulo: string;
  descricao: string;
  nivel: NivelDesafio;
  tecnologia: string;
  enunciado: string;
  dicas: string[];
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
  plataforma: string;
}

export interface RespostaFerramenta {
  sucesso: boolean;
  dados?: unknown;
  erro?: string;
  timestamp: string;
}

export type NivelTrilha = 'iniciante' | 'intermediario' | 'avancado';
export type NivelDesafio = 'Basico' | 'Intermediario' | 'Avancado';

export const TECNOLOGIAS_DISPONIVEIS = [
  'python', 'java', 'javascript', 'typescript', 'react', 'nodejs',
  'angular', 'vue', 'csharp', 'dotnet', 'go', 'rust', 'kotlin',
  'swift', 'php', 'ruby', 'scala', 'dart', 'flutter', 'devops',
] as const;

export type Tecnologia = typeof TECNOLOGIAS_DISPONIVEIS[number];

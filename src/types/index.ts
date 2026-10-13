// Tipos globais do projeto
export interface Trilha {
  id: number;
  nome: string;
  tecnologia: string;
  nivel: 'Básico' | 'Intermediário' | 'Avançado';
  modulos: number;
  xp_total: number;
  beds_disponiveis: number;
  promocao_vitalicio: boolean;
  lives_ao_vivo: number;
}

export interface Certificado {
  id: string;
  nome_usuario: string;
  trilha: string;
  tecnologia: string;
  data_conclusao: string;
  xp_obtido: number;
}

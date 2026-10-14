import type { Trilha, NivelTrilha } from '../types/index.js';

const TRILHAS_DATABASE: Trilha[] = [
  {
    id: 'trilha-java-001',
    tecnologia: 'java',
    titulo: 'Java Developer — Fundamentos ao Avançado',
    nivel: 'iniciante',
    duracaoHoras: 80,
    modulos: [
      { id: 'm1', titulo: 'Introdução ao Java', descricao: 'Sintaxe básica, variáveis e tipos', duracaoHoras: 10, ordem: 1 },
      { id: 'm2', titulo: 'Orientação a Objetos', descricao: 'Classes, herança e polimorfismo', duracaoHoras: 15, ordem: 2 },
      { id: 'm3', titulo: 'Collections e Streams', descricao: 'API de coleções e Stream API', duracaoHoras: 12, ordem: 3 },
      { id: 'm4', titulo: 'Spring Boot', descricao: 'Desenvolvimento de APIs REST com Spring', duracaoHoras: 20, ordem: 4 },
      { id: 'm5', titulo: 'Testes com JUnit', descricao: 'Testes unitários e de integração', duracaoHoras: 10, ordem: 5 },
      { id: 'm6', titulo: 'Docker e Deploy', descricao: 'Containerização e CI/CD', duracaoHoras: 13, ordem: 6 },
    ],
  },
  {
    id: 'trilha-typescript-001',
    tecnologia: 'typescript',
    titulo: 'TypeScript Fullstack Developer',
    nivel: 'intermediario',
    duracaoHoras: 60,
    modulos: [
      { id: 'm1', titulo: 'TypeScript Essentials', descricao: 'Tipos, interfaces e genéricos', duracaoHoras: 10, ordem: 1 },
      { id: 'm2', titulo: 'Node.js com TypeScript', descricao: 'Backend com Express e TS', duracaoHoras: 15, ordem: 2 },
      { id: 'm3', titulo: 'React com TypeScript', descricao: 'Frontend tipado com React', duracaoHoras: 20, ordem: 3 },
      { id: 'm4', titulo: 'Testes com Jest', descricao: 'Testes unitários com ts-jest', duracaoHoras: 15, ordem: 4 },
    ],
  },
  {
    id: 'trilha-python-001',
    tecnologia: 'python',
    titulo: 'Python AI Developer',
    nivel: 'intermediario',
    duracaoHoras: 70,
    modulos: [
      { id: 'm1', titulo: 'Python Fundamentos', descricao: 'Sintaxe, listas e funções', duracaoHoras: 10, ordem: 1 },
      { id: 'm2', titulo: 'Pandas e NumPy', descricao: 'Manipulação de dados', duracaoHoras: 15, ordem: 2 },
      { id: 'm3', titulo: 'Machine Learning', descricao: 'Scikit-learn e modelos', duracaoHoras: 25, ordem: 3 },
      { id: 'm4', titulo: 'LLMs e IA Generativa', descricao: 'LangChain e prompts', duracaoHoras: 20, ordem: 4 },
    ],
  },
];

export function buscarTrilha(tecnologia: string): Trilha | undefined {
  return TRILHAS_DATABASE.find(
    (t) => t.tecnologia.toLowerCase() === tecnologia.toLowerCase()
  );
}

export function listarTrilhas(): Trilha[] {
  return TRILHAS_DATABASE;
}

export function filtrarPorNivel(nivel: NivelTrilha): Trilha[] {
  return TRILHAS_DATABASE.filter((t) => t.nivel === nivel);
}

export function formatarTrilha(trilha: Trilha): string {
  const modulos = trilha.modulos
    .map((m) => `  ${m.ordem}. ${m.titulo} (${m.duracaoHoras}h) — ${m.descricao}`)
    .join('\n');

  return `
🎯 ${trilha.titulo}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏷️  Tecnologia : ${trilha.tecnologia.toUpperCase()}
📊 Nível       : ${trilha.nivel}
⏱️  Duração     : ${trilha.duracaoHoras} horas
📚 Módulos (${trilha.modulos.length}):
${modulos}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `.trim();
}

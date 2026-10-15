import type { Trilha, NivelTrilha } from '../types/index.js';
import trilhas from '../data/trilhas.json';
const TRILHAS_DATABASE: Trilha[] = trilhas as Trilha[];;

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

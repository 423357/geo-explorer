// tools.ts — Definições das 4 ferramentas MCP do IBM Bob Lab

import type { RespostaFerramenta, NivelDesafio } from './types.js';
import {
  buscarTrilha,
  listarTrilhas,
  formatarTrilha,
  gerarDesafio,
  salvarDesafio,
  gerarCertificado,
  salvarCertificado,
  formatarCertificado,
  listarTecnologias,
} from './services.js';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function ok(dados: unknown): RespostaFerramenta {
  return { sucesso: true, dados, timestamp: new Date().toISOString() };
}

function erro(mensagem: string): RespostaFerramenta {
  return { sucesso: false, erro: mensagem, timestamp: new Date().toISOString() };
}

function tecnologiaValida(tecnologia: string): boolean {
  return listarTecnologias().includes(tecnologia.toLowerCase());
}

// ─── Ferramenta: buscar_trilha ────────────────────────────────────────────────

/**
 * Busca informações detalhadas sobre trilhas de aprendizado DIO.
 * Sem argumentos lista todas; com tecnologia retorna os módulos, XP e badges.
 */
export function toolBuscarTrilha(tecnologia?: string): RespostaFerramenta {
  if (!tecnologia) {
    const trilhas = listarTrilhas();
    const lista = trilhas
      .map((t) => `• ${t.tecnologia.toUpperCase()} — ${t.titulo} (${t.duracaoHoras}h | ${t.xp} XP)`)
      .join('\n');
    return ok({ mensagem: `Trilhas disponíveis:\n${lista}`, total: trilhas.length, trilhas });
  }

  if (!tecnologiaValida(tecnologia)) {
    return erro(
      `Tecnologia "${tecnologia}" não encontrada. Disponíveis: ${listarTecnologias().join(', ')}`
    );
  }

  const trilha = buscarTrilha(tecnologia);
  if (!trilha) {
    return erro(`Nenhuma trilha cadastrada para: ${tecnologia}`);
  }

  return ok({ mensagem: formatarTrilha(trilha), trilha });
}

// ─── Ferramenta: gerar_desafio ────────────────────────────────────────────────

/**
 * Gera um desafio de código aleatório por tecnologia e nível.
 * Salva um arquivo Markdown no diretório de saída.
 */
export function toolGerarDesafio(
  tecnologia: string,
  nivel: string,
  outputDir?: string
): RespostaFerramenta {
  if (!tecnologiaValida(tecnologia)) {
    return erro(`Tecnologia "${tecnologia}" não suportada`);
  }

  const niveisValidos = ['Basico', 'Intermediario', 'Avancado'];
  const nivelFormatado = nivel.charAt(0).toUpperCase() + nivel.slice(1).toLowerCase();
  if (!niveisValidos.includes(nivelFormatado)) {
    return erro(`Nível "${nivel}" inválido. Use: Basico, Intermediario ou Avancado`);
  }

  const desafio = gerarDesafio(tecnologia, nivelFormatado as NivelDesafio);
  if (!desafio) {
    return erro(`Desafio não disponível para ${tecnologia} nível ${nivelFormatado} ainda`);
  }

  const caminho = salvarDesafio(desafio, outputDir);
  return ok({
    mensagem: `✅ Desafio gerado: ${caminho}`,
    desafio,
    arquivo: caminho,
  });
}

// ─── Ferramenta: gerar_certificado ───────────────────────────────────────────

/**
 * Emite um certificado de conclusão de trilha para um aluno.
 * Salva um arquivo Markdown formatado no diretório de saída.
 */
export function toolGerarCertificado(
  alunoNome: string,
  trilhaNome: string,
  outputDir?: string
): RespostaFerramenta {
  if (!alunoNome || alunoNome.trim().length < 2) {
    return erro('Nome do aluno inválido (mínimo 2 caracteres)');
  }
  if (!trilhaNome || trilhaNome.trim().length < 2) {
    return erro('Nome da trilha inválido');
  }

  const trilha = buscarTrilha(trilhaNome);
  const cargaHoraria = trilha?.duracaoHoras ?? 40;

  const certificado = gerarCertificado(alunoNome.trim(), trilhaNome.trim(), cargaHoraria);
  const caminho = salvarCertificado(certificado, outputDir);

  return ok({
    mensagem: formatarCertificado(certificado),
    certificado,
    arquivo: caminho,
  });
}

// ─── Ferramenta: listar_tecnologias ──────────────────────────────────────────

/**
 * Lista todas as tecnologias disponíveis no servidor MCP.
 */
export function toolListarTecnologias(): RespostaFerramenta {
  const tecnologias = listarTecnologias();
  return ok({
    mensagem: `${tecnologias.length} tecnologias disponíveis:\n${tecnologias.map((t) => `• ${t}`).join('\n')}`,
    total: tecnologias.length,
    tecnologias,
  });
}

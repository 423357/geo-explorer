import { buscarTrilha, listarTrilhas, filtrarPorNivel, formatarTrilha } from '../services/trilha.service.js';
import { gerarDesafio, salvarDesafio } from '../services/desafio.service.js';
import { gerarCertificado, salvarCertificado, formatarCertificado } from '../services/certificado.service.js';
import { criarResposta, criarErro, validarTecnologia, validarNivel } from '../utils/helpers.js';
import type { NivelDesafio, RespostaComando } from '../types/index.js';

/**
 * Ferramenta /trilha — consulta trilhas de aprendizado
 */
export function toolTrilha(tecnologia?: string): RespostaComando {
  if (!tecnologia) {
    const trilhas = listarTrilhas();
    const lista = trilhas
      .map((t) => `• ${t.tecnologia.toUpperCase()} — ${t.titulo} (${t.duracaoHoras}h)`)
      .join('\n');
    return criarResposta({ mensagem: `Trilhas disponíveis:\n${lista}`, trilhas });
  }

  if (!validarTecnologia(tecnologia)) {
    return criarErro(`Tecnologia "${tecnologia}" não encontrada. Tente: java, typescript, python`);
  }

  const trilha = buscarTrilha(tecnologia);
  if (!trilha) {
    return criarErro(`Nenhuma trilha encontrada para: ${tecnologia}`);
  }

  return criarResposta({ mensagem: formatarTrilha(trilha), trilha });
}

/**
 * Ferramenta /desafio — gera arquivo de desafio para o aluno
 */
export function toolDesafio(tecnologia: string, nivel: string, outputDir?: string): RespostaComando {
  if (!validarTecnologia(tecnologia)) {
    return criarErro(`Tecnologia "${tecnologia}" não suportada`);
  }

  if (!validarNivel(nivel)) {
    return criarErro(`Nível "${nivel}" inválido. Use: basico, intermediario ou avancado`);
  }

  const desafio = gerarDesafio(tecnologia, nivel as NivelDesafio);
  if (!desafio) {
    return criarErro(`Desafio não encontrado para ${tecnologia} nível ${nivel}`);
  }

  const caminho = salvarDesafio(desafio, outputDir);
  return criarResposta({
    mensagem: `✅ Desafio gerado: ${caminho}`,
    desafio,
    arquivo: caminho,
  });
}

/**
 * Ferramenta /certificado — gera certificado de conclusão
 */
export function toolCertificado(alunoNome: string, trilhaNome: string, outputDir?: string): RespostaComando {
  if (!alunoNome || alunoNome.trim().length < 2) {
    return criarErro('Nome do aluno inválido (mínimo 2 caracteres)');
  }

  if (!trilhaNome || trilhaNome.trim().length < 2) {
    return criarErro('Nome da trilha inválido');
  }

  const trilha = buscarTrilha(trilhaNome);

if (!trilha) {
  return criarErro(`Trilha não encontrada: ${trilhaNome}`);
}

const cargaHoraria = trilha.duracaoHoras;

  const certificado = gerarCertificado(alunoNome.trim(), trilhaNome.trim(), cargaHoraria);
  const caminho = salvarCertificado(certificado, outputDir);

  return criarResposta({
    mensagem: formatarCertificado(certificado),
    certificado,
    arquivo: caminho,
  });
}

/**
 * Ferramenta /status — informações do servidor MCP
 */
export function toolStatus(): RespostaComando {
  const trilhas = listarTrilhas();
  return criarResposta({
    servidor: 'IBM Bob Lab MCP',
    versao: '1.0.0',
    status: 'online',
    trilhasCarregadas: trilhas.length,
    tecnologias: trilhas.map((t) => t.tecnologia),
    uptime: process.uptime(),
  });
}

import {
  toolTrilha,
  toolDesafio,
  toolCertificado,
} from '../../dist/tools/commands.js';
import { listarTrilhas } from '../../dist/services/trilha.service.js';

export const toolBuscarTrilha = toolTrilha;
export const toolGerarCertificado = toolCertificado;

export function toolGerarDesafio(
  tecnologia: string,
  nivel: string,
  outputDir?: string
) {
  return toolDesafio(tecnologia, nivel.toLowerCase(), outputDir);
}

export function toolListarTecnologias() {
  const tecnologias = listarTrilhas().map(trilha => trilha.tecnologia);

  return {
    sucesso: true,
    dados: {
      mensagem: `Tecnologias disponíveis: ${tecnologias.join(', ')}`,
      total: tecnologias.length,
      tecnologias,
    },
    timestamp: new Date().toISOString(),
  };
}
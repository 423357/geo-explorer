#!/usr/bin/env node
/**
 * index.ts — Servidor MCP principal do IBM Bob Lab
 *
 * Expõe 4 ferramentas MCP para agentes de IA (IBM Bob, Claude Desktop):
 *   1. buscar_trilha      — plano de estudos completo com módulos, XP, badges e lives
 *   2. gerar_desafio      — desafio de código com descrição, requisitos, dicas e exemplos
 *   3. gerar_certificado  — certificado formatado e salvo em arquivo Markdown
 *   4. listar_tecnologias — lista 20+ tecnologias disponíveis
 *
 * Transporte padrão: stdio (para uso pelo IBM Bob / Claude Desktop)
 * Para acesso remoto via API/HTTPS: MCP_TRANSPORT=http node dist/index.js
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { toolBuscarTrilha, toolGerarDesafio, toolGerarCertificado, toolListarTecnologias } from './tools.js';

// ─── Servidor MCP ─────────────────────────────────────────────────────────────

const server = new McpServer({
  name: 'ibm-bob-lab',
  version: '1.0.0',
});

// ─── 1. buscar_trilha ─────────────────────────────────────────────────────────

server.registerTool(
  'buscar_trilha',
  {
    description:
      'Busca informações detalhadas sobre trilhas de aprendizado DIO. ' +
      'Sem tecnologia lista todas. Com tecnologia retorna: plano de estudos completo, ' +
      'módulos, XP, badges e lives.',
    inputSchema: z.object({
      tecnologia: z
        .string()
        .optional()
        .describe('Nome da tecnologia (ex: Python, Java, React). Omita para listar todas.'),
    }),
  },
  async ({ tecnologia }) => {
    const resultado = toolBuscarTrilha(tecnologia);
    return {
      content: [{ type: 'text', text: JSON.stringify(resultado, null, 2) }],
      isError: !resultado.sucesso,
    };
  }
);

// ─── 2. gerar_desafio ─────────────────────────────────────────────────────────

server.registerTool(
  'gerar_desafio',
  {
    description:
      'Gera desafios de código com descrição, requisitos, dicas e exemplos. ' +
      'Salva um arquivo Markdown no diretório de saída.',
    inputSchema: z.object({
      tecnologia: z.string().describe('Tecnologia do desafio (ex: java, python, typescript)'),
      nivel: z
        .enum(['Basico', 'Intermediario', 'Avancado'])
        .describe('Nível de dificuldade'),
      outputDir: z
        .string()
        .optional()
        .describe('Diretório de saída (padrão: dist)'),
    }),
  },
  async ({ tecnologia, nivel, outputDir }) => {
    const resultado = toolGerarDesafio(tecnologia, nivel, outputDir);
    return {
      content: [{ type: 'text', text: JSON.stringify(resultado, null, 2) }],
      isError: !resultado.sucesso,
    };
  }
);

// ─── 3. gerar_certificado ────────────────────────────────────────────────────

server.registerTool(
  'gerar_certificado',
  {
    description:
      'Emite certificados de conclusão em Markdown. ' +
      'Recebe o nome do aluno e a tecnologia/trilha concluída.',
    inputSchema: z.object({
      alunoNome: z.string().min(2).describe('Nome completo do aluno'),
      trilhaNome: z
        .string()
        .min(2)
        .describe('Nome da trilha concluída (ex: java, python, react)'),
      outputDir: z
        .string()
        .optional()
        .describe('Diretório de saída (padrão: dist)'),
    }),
  },
  async ({ alunoNome, trilhaNome, outputDir }) => {
    const resultado = toolGerarCertificado(alunoNome, trilhaNome, outputDir);
    return {
      content: [{ type: 'text', text: JSON.stringify(resultado, null, 2) }],
      isError: !resultado.sucesso,
    };
  }
);

// ─── 4. listar_tecnologias ────────────────────────────────────────────────────

server.registerTool(
  'listar_tecnologias',
  {
    description: 'Lista todas as 20+ tecnologias disponíveis no servidor MCP.',
    inputSchema: z.object({}),
  },
  async () => {
    const resultado = toolListarTecnologias();
    return {
      content: [{ type: 'text', text: JSON.stringify(resultado, null, 2) }],
      isError: !resultado.sucesso,
    };
  }
);

// ─── Inicialização ────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const transport = process.env['MCP_TRANSPORT'];

  if (transport === 'http') {
    // Transporte HTTP — para acesso remoto via API, HTTPS ou SSO
    const { createServer } = await import('http');
    const { StreamableHTTPServerTransport } = await import(
      '@modelcontextprotocol/sdk/server/streamableHttp.js'
    );

    const port = parseInt(process.env['PORT'] ?? '3100', 10);
    const httpTransport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });

    const httpServer = createServer((req, res) => {
      httpTransport.handleRequest(req, res, req.body as unknown);
    });

    await server.connect(httpTransport);

    httpServer.listen(port, () => {
      console.error(`[ibm-bob-lab] MCP HTTP Server escutando em http://localhost:${port}`);
      console.error('[ibm-bob-lab] Ferramentas: buscar_trilha, gerar_desafio, gerar_certificado, listar_tecnologias');
    });
  } else {
    // Transporte stdio — padrão para IBM Bob e Claude Desktop
    const stdioTransport = new StdioServerTransport();
    await server.connect(stdioTransport);
    console.error('[ibm-bob-lab] MCP Server stdio iniciado — aguardando conexão do agente');
  }
}

main().catch((error) => {
  console.error('[ibm-bob-lab] Erro fatal:', error);
  process.exit(1);
});

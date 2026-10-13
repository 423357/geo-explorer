// Configuração e inicialização do servidor MCP
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerTools } from './tools/index';

export async function startServer(): Promise<void> {
  const server = new Server(
    { name: 'ibm-bob-lab', version: '1.0.0' },
    { capabilities: { tools: {} } }
  );

  registerTools(server);

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Servidor MCP IBM Bob Lab iniciado.');
}

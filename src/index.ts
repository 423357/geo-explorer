// Ponto de entrada do servidor MCP
import { startServer } from './server';

startServer().catch((error) => {
  console.error('Erro ao iniciar o servidor:', error);
  process.exit(1);
});

import { toolTrilha, toolDesafio, toolCertificado, toolStatus } from './tools/commands.js';

console.log('🚀 IBM Bob Lab MCP iniciado');

// Demonstração rápida dos comandos
const resultTrilha = toolTrilha('java');
console.log('=== /trilha java ===');
console.log(JSON.stringify(resultTrilha, null, 2));

const resultDesafio = toolDesafio('java', 'basico', 'dist');
console.log('\n=== /desafio java basico ===');
console.log(JSON.stringify(resultDesafio, null, 2));

const resultCertificado = toolCertificado('Ana Silva', 'java', 'dist');
console.log('\n=== /certificado "Ana Silva" java ===');
console.log(JSON.stringify(resultCertificado, null, 2));

const resultStatus = toolStatus();
console.log('\n=== /status ===');
console.log(JSON.stringify(resultStatus, null, 2));

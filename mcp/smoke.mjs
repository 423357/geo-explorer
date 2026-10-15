import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const pastaMcp = fileURLToPath(new URL('.', import.meta.url));
const servidor = fileURLToPath(new URL('./dist/index.js', import.meta.url));

const cliente = new Client({
  name: 'geo-explorer-teste',
  version: '1.0.0',
});
const pastaSaida = mkdtempSync(join(tmpdir(), 'geo-explorer-mcp-'));
try {
  await cliente.connect(
    new StdioClientTransport({
      command: process.execPath,
      args: [servidor],
      cwd: pastaMcp,
    })
  );

  const lista = await cliente.listTools();
  const nomes = lista.tools.map(ferramenta => ferramenta.name);

  assert.deepEqual(nomes.sort(), [
    'buscar_trilha',
    'gerar_certificado',
    'gerar_desafio',
    'listar_tecnologias',
  ]);

  console.log('Conexão MCP e lista das quatro ferramentas: OK');

  const resposta = await cliente.callTool({
    name: 'buscar_trilha',
    arguments: { tecnologia: 'java' },
  });

  assert.equal(resposta.isError, false);

  const texto = resposta.content.find(item => item.type === 'text');
  assert.ok(texto, 'A ferramenta precisa retornar texto.');

  const resultado = JSON.parse(texto.text);

  assert.equal(resultado.sucesso, true);
  assert.equal(resultado.dados.trilha.tecnologia, 'java');

  console.log('Consulta real da trilha Java pelo MCP: OK');
  const recusa = await cliente.callTool({
    name: 'gerar_certificado',
    arguments: {
      alunoNome: 'Ana Silva',
      trilhaNome: 'inexistente',
    },
  });

  assert.equal(recusa.isError, true);

  const textoRecusa = recusa.content.find(item => item.type === 'text');
  assert.ok(textoRecusa, 'A recusa precisa retornar uma explicação.');

  const erro = JSON.parse(textoRecusa.text);

  assert.equal(erro.sucesso, false);
  assert.equal(erro.erro, 'Trilha não encontrada: inexistente');
  assert.equal(erro.dados, undefined);

  console.log('Recusa de certificado para trilha inexistente pelo MCP: OK');
  const tecnologias = await cliente.callTool({
    name: 'listar_tecnologias',
    arguments: {},
  });

  assert.equal(tecnologias.isError, false);

  const textoTecnologias = tecnologias.content.find(
    item => item.type === 'text'
  );
  assert.ok(textoTecnologias, 'A listagem precisa retornar texto.');

  const catalogo = JSON.parse(textoTecnologias.text);

  assert.equal(catalogo.sucesso, true);
  assert.equal(catalogo.dados.total, 3);
  assert.deepEqual(
    catalogo.dados.tecnologias,
    ['java', 'typescript', 'python']
  );

  console.log('Tecnologias da base JSON pelo MCP: OK');
  const desafio = await cliente.callTool({
    name: 'gerar_desafio',
    arguments: {
      tecnologia: 'java',
      nivel: 'Basico',
      outputDir: pastaSaida,
    },
  });

  assert.equal(desafio.isError, false);

  const textoDesafio = desafio.content.find(item => item.type === 'text');
  assert.ok(textoDesafio, 'O desafio precisa retornar texto.');

  const dadosDesafio = JSON.parse(textoDesafio.text);

  assert.equal(dadosDesafio.sucesso, true);
  assert.equal(dadosDesafio.dados.desafio.tecnologia, 'java');

  const arquivoDesafio = readFileSync(
    dadosDesafio.dados.arquivo,
    'utf-8'
  );

  assert.ok(arquivoDesafio.includes('Calculadora Simples em Java'));
  assert.ok(arquivoDesafio.includes('Desafio gerado pelo Geo-Explorer'));

  console.log('Geração e leitura do desafio pelo MCP: OK');
  const certificado = await cliente.callTool({
    name: 'gerar_certificado',
    arguments: {
      alunoNome: 'Pessoa Exemplo',
      trilhaNome: 'python',
      outputDir: pastaSaida,
    },
  });

  assert.equal(certificado.isError, false);

  const textoCertificado = certificado.content.find(
    item => item.type === 'text'
  );
  assert.ok(textoCertificado, 'O certificado precisa retornar texto.');

  const dadosCertificado = JSON.parse(textoCertificado.text);

  assert.equal(dadosCertificado.sucesso, true);
  assert.equal(dadosCertificado.dados.certificado.alunoNome, 'Pessoa Exemplo');
  assert.equal(dadosCertificado.dados.certificado.cargaHoraria, 70);

  const arquivoCertificado = readFileSync(
    dadosCertificado.dados.arquivo,
    'utf-8'
  );

  assert.ok(arquivoCertificado.includes('PESSOA EXEMPLO'));
  assert.ok(arquivoCertificado.includes('# Certificado Fictício de Conclusão'));
  assert.ok(arquivoCertificado.includes('não é emitido pela DIO'));
  assert.ok(!arquivoCertificado.includes('https://www.dio.me/certificate/'));

  console.log('Geração e leitura do certificado fictício pelo MCP: OK');
} finally {
  try {
    await cliente.close();
  } finally {
    rmSync(pastaSaida, { recursive: true, force: true });
  }
}
/**
 * Teste de Integração — Fluxo Completo DIO
 *
 * Simula o fluxo completo de um aluno:
 * 1. Consultar trilha de Java (/trilha java)
 * 2. Gerar desafio para o aluno (/desafio java basico)
 * 3. Emitir certificado de conclusão (/certificado "Ana Silva" java)
 */
import * as fs from 'fs';
import * as path from 'path';
import { toolTrilha, toolDesafio, toolCertificado } from '../../src/tools/commands';

const INTEGRATION_OUTPUT = path.join(__dirname, 'output-integracao');

describe('Integração — Fluxo Completo do Aluno DIO', () => {
  beforeAll(() => {
    if (!fs.existsSync(INTEGRATION_OUTPUT)) {
      fs.mkdirSync(INTEGRATION_OUTPUT, { recursive: true });
    }
  });

  afterAll(() => {
    if (fs.existsSync(INTEGRATION_OUTPUT)) {
      fs.rmSync(INTEGRATION_OUTPUT, { recursive: true, force: true });
    }
  });

  it('Passo 1 — /trilha java: deve retornar trilha com módulos', () => {
    const resp = toolTrilha('java');
    expect(resp.sucesso).toBe(true);
    const dados = resp.dados as { trilha: { modulos: unknown[] } };
    expect(dados.trilha.modulos.length).toBeGreaterThan(0);
  });

  it('Passo 2 — /desafio java basico: deve gerar arquivo de desafio', () => {
    const resp = toolDesafio('java', 'basico', INTEGRATION_OUTPUT);
    expect(resp.sucesso).toBe(true);

    const dados = resp.dados as { arquivo: string; desafio: { titulo: string } };
    expect(fs.existsSync(dados.arquivo)).toBe(true);

    const conteudo = fs.readFileSync(dados.arquivo, 'utf-8');
    expect(conteudo).toContain('java');
    expect(conteudo).toContain('basico');
  });

  it('Passo 3 — /certificado "Ana Silva" java: deve gerar certificado', () => {
    const resp = toolCertificado('Ana Silva', 'java', INTEGRATION_OUTPUT);
    expect(resp.sucesso).toBe(true);

    const dados = resp.dados as {
      arquivo: string;
      certificado: { alunoNome: string; codigoValidacao: string };
    };

    expect(fs.existsSync(dados.arquivo)).toBe(true);
    expect(dados.certificado.alunoNome).toBe('Ana Silva');
    expect(dados.certificado.codigoValidacao).toBeTruthy();

    const conteudo = fs.readFileSync(dados.arquivo, 'utf-8');
    expect(conteudo).toContain('ANA SILVA');
    expect(conteudo).toContain(dados.certificado.codigoValidacao);
  });

  it('Fluxo completo — ambos os arquivos gerados devem existir no output', () => {
    // Gera os dois artefatos
    const respDesafio = toolDesafio('java', 'intermediario', INTEGRATION_OUTPUT);
    const respCert = toolCertificado('João Costa', 'java', INTEGRATION_OUTPUT);

    const dadosDesafio = respDesafio.dados as { arquivo: string };
    const dadosCert = respCert.dados as { arquivo: string };

    expect(fs.existsSync(dadosDesafio.arquivo)).toBe(true);
    expect(fs.existsSync(dadosCert.arquivo)).toBe(true);

    // Verifica que são arquivos distintos
    expect(dadosDesafio.arquivo).not.toBe(dadosCert.arquivo);
  });

  it('Fluxo de erro — tecnologia inválida não deve gerar arquivo', () => {
    const respTrilha = toolTrilha('fortran');
    const respDesafio = toolDesafio('fortran', 'basico', INTEGRATION_OUTPUT);

    expect(respTrilha.sucesso).toBe(false);
    expect(respDesafio.sucesso).toBe(false);
  });
});

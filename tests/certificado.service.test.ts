import * as fs from 'fs';
import * as path from 'path';
import {
  gerarCertificado,
  salvarCertificado,
  formatarCertificado,
} from '../src/services/certificado.service';

const TEST_OUTPUT_DIR = path.join(__dirname, '../fixtures/output-certificados');

describe('CertificadoService', () => {
  beforeAll(() => {
    if (!fs.existsSync(TEST_OUTPUT_DIR)) {
      fs.mkdirSync(TEST_OUTPUT_DIR, { recursive: true });
    }
  });

  afterAll(() => {
    if (fs.existsSync(TEST_OUTPUT_DIR)) {
      fs.rmSync(TEST_OUTPUT_DIR, { recursive: true, force: true });
    }
  });

  describe('gerarCertificado()', () => {
    it('deve gerar certificado com dados corretos', () => {
      const cert = gerarCertificado('Ana Silva', 'java', 80);
      expect(cert.alunoNome).toBe('Ana Silva');
      expect(cert.trilha).toBe('java');
      expect(cert.cargaHoraria).toBe(80);
    });

    it('deve gerar um código de validação único', () => {
      const cert1 = gerarCertificado('Ana Silva', 'java', 80);
      const cert2 = gerarCertificado('João Costa', 'python', 70);
      expect(cert1.codigoValidacao).not.toBe(cert2.codigoValidacao);
    });

    it('código de validação deve ter 16 caracteres', () => {
      const cert = gerarCertificado('Ana Silva', 'java', 80);
      expect(cert.codigoValidacao.length).toBe(16);
    });

    it('código de validação deve ser maiúsculo', () => {
      const cert = gerarCertificado('Ana Silva', 'java', 80);
      expect(cert.codigoValidacao).toBe(cert.codigoValidacao.toUpperCase());
    });

    it('deve preencher dataEmissao com ISO string válida', () => {
      const cert = gerarCertificado('Ana Silva', 'java', 80);
      expect(() => new Date(cert.dataEmissao)).not.toThrow();
      expect(new Date(cert.dataEmissao).getTime()).not.toBeNaN();
    });

    it('deve gerar id único', () => {
      const cert = gerarCertificado('Ana Silva', 'java', 80);
      expect(cert.id).toBeTruthy();
      expect(cert.id.startsWith('cert-')).toBe(true);
    });
  });

  describe('salvarCertificado()', () => {
    it('deve salvar arquivo .md no diretório especificado', () => {
      const cert = gerarCertificado('Ana Silva', 'java', 80);
      const caminho = salvarCertificado(cert, TEST_OUTPUT_DIR);

      expect(fs.existsSync(caminho)).toBe(true);
      expect(caminho.endsWith('.md')).toBe(true);
    });

    it('deve criar diretório se não existir', () => {
      const novoDir = path.join(TEST_OUTPUT_DIR, 'novo-subdir');
      const cert = gerarCertificado('Pedro Santos', 'typescript', 60);
      salvarCertificado(cert, novoDir);

      expect(fs.existsSync(novoDir)).toBe(true);
    });

    it('arquivo deve conter nome do aluno', () => {
      const cert = gerarCertificado('Maria Oliveira', 'python', 70);
      const caminho = salvarCertificado(cert, TEST_OUTPUT_DIR);
      const conteudo = fs.readFileSync(caminho, 'utf-8');

      expect(conteudo).toContain('MARIA OLIVEIRA');
    });

    it('arquivo deve conter código de validação', () => {
      const cert = gerarCertificado('Carlos Lima', 'java', 80);
      const caminho = salvarCertificado(cert, TEST_OUTPUT_DIR);
      const conteudo = fs.readFileSync(caminho, 'utf-8');

      expect(conteudo).toContain(cert.codigoValidacao);
    });
    it('deve deixar explícito que o certificado é fictício', () => {
      const cert = gerarCertificado('Ana Silva', 'java', 80);
      const caminho = salvarCertificado(cert, TEST_OUTPUT_DIR);
      const conteudo = fs.readFileSync(caminho, 'utf-8');

      expect(conteudo).toContain('# Certificado Fictício de Conclusão');
      expect(conteudo).toContain('Não possui validade acadêmica ou profissional');
      expect(conteudo).toContain('não é emitido pela DIO');
      expect(conteudo).toContain('não existe validação externa');
      expect(conteudo).not.toContain('https://www.dio.me/certificate/');
    });
    it('nome do arquivo deve conter nome do aluno e trilha', () => {
      const cert = gerarCertificado('Ana Silva', 'java', 80);
      const caminho = salvarCertificado(cert, TEST_OUTPUT_DIR);
      const nomeArquivo = path.basename(caminho);

      expect(nomeArquivo).toContain('ana_silva');
      expect(nomeArquivo).toContain('java');
    });
  });

  describe('formatarCertificado()', () => {
    it('deve retornar string com nome do aluno', () => {
      const cert = gerarCertificado('Ana Silva', 'java', 80);
      const formatado = formatarCertificado(cert);
      expect(formatado).toContain('Ana Silva');
    });

    it('deve retornar string com nome da trilha', () => {
      const cert = gerarCertificado('Ana Silva', 'java', 80);
      const formatado = formatarCertificado(cert);
      expect(formatado).toContain('java');
    });

    it('deve retornar string com código de validação', () => {
      const cert = gerarCertificado('Ana Silva', 'java', 80);
      const formatado = formatarCertificado(cert);
      expect(formatado).toContain(cert.codigoValidacao);
    });
  });
});

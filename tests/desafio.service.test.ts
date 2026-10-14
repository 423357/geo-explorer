import * as fs from 'fs';
import * as path from 'path';
import { gerarDesafio, salvarDesafio } from '../src/services/desafio.service';

const TEST_OUTPUT_DIR = path.join(__dirname, '../fixtures/output-desafios');

describe('DesafioService', () => {
  beforeAll(() => {
    if (!fs.existsSync(TEST_OUTPUT_DIR)) {
      fs.mkdirSync(TEST_OUTPUT_DIR, { recursive: true });
    }
  });

  afterAll(() => {
    // limpa arquivos gerados nos testes
    if (fs.existsSync(TEST_OUTPUT_DIR)) {
      fs.rmSync(TEST_OUTPUT_DIR, { recursive: true, force: true });
    }
  });

  describe('gerarDesafio()', () => {
    it('deve gerar desafio java nível básico', () => {
      const desafio = gerarDesafio('java', 'basico');
      expect(desafio).toBeDefined();
      expect(desafio?.tecnologia).toBe('java');
      expect(desafio?.nivel).toBe('basico');
    });

    it('deve gerar desafio java nível intermediário', () => {
      const desafio = gerarDesafio('java', 'intermediario');
      expect(desafio).toBeDefined();
      expect(desafio?.nivel).toBe('intermediario');
    });

    it('deve gerar desafio java nível avançado', () => {
      const desafio = gerarDesafio('java', 'avancado');
      expect(desafio).toBeDefined();
      expect(desafio?.nivel).toBe('avancado');
    });

    it('deve retornar undefined para tecnologia sem desafios', () => {
      const desafio = gerarDesafio('cobol', 'basico');
      expect(desafio).toBeUndefined();
    });

    it('deve retornar undefined para nível inexistente', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const desafio = gerarDesafio('java', 'expert' as any);
      expect(desafio).toBeUndefined();
    });

    it('deve retornar desafio com enunciado preenchido', () => {
      const desafio = gerarDesafio('java', 'basico');
      expect(desafio?.enunciado).toBeTruthy();
      expect(desafio?.enunciado.length).toBeGreaterThan(10);
    });

    it('deve retornar desafio com exemplos de entrada e saída', () => {
      const desafio = gerarDesafio('java', 'basico');
      expect(desafio?.exemplosEntrada.length).toBeGreaterThan(0);
      expect(desafio?.exemplosSaida.length).toBeGreaterThan(0);
    });

    it('deve aceitar tecnologia em maiúsculo', () => {
      const desafio = gerarDesafio('JAVA', 'basico');
      expect(desafio).toBeDefined();
    });
  });

  describe('salvarDesafio()', () => {
    it('deve salvar arquivo .md no diretório especificado', () => {
      const desafio = gerarDesafio('java', 'basico')!;
      const caminho = salvarDesafio(desafio, TEST_OUTPUT_DIR);

      expect(fs.existsSync(caminho)).toBe(true);
      expect(caminho.endsWith('.md')).toBe(true);
    });

    it('deve criar o diretório se não existir', () => {
      const novoDir = path.join(TEST_OUTPUT_DIR, 'subdir-teste');
      const desafio = gerarDesafio('java', 'basico')!;
      const caminho = salvarDesafio(desafio, novoDir);

      expect(fs.existsSync(novoDir)).toBe(true);
      expect(fs.existsSync(caminho)).toBe(true);
    });

    it('arquivo gerado deve conter o enunciado', () => {
      const desafio = gerarDesafio('java', 'basico')!;
      const caminho = salvarDesafio(desafio, TEST_OUTPUT_DIR);
      const conteudo = fs.readFileSync(caminho, 'utf-8');

      expect(conteudo).toContain(desafio.titulo);
      expect(conteudo).toContain('Desafio gerado pelo IBM Bob Lab MCP');
    });

    it('nome do arquivo deve conter tecnologia e nível', () => {
      const desafio = gerarDesafio('java', 'intermediario')!;
      const caminho = salvarDesafio(desafio, TEST_OUTPUT_DIR);
      const nomeArquivo = path.basename(caminho);

      expect(nomeArquivo).toContain('java');
      expect(nomeArquivo).toContain('intermediario');
    });
  });
});

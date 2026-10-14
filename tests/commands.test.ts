import {
  toolTrilha,
  toolDesafio,
  toolCertificado,
  toolStatus,
} from '../src/tools/commands';

describe('Commands Tools — /trilha, /desafio, /certificado, /status', () => {
  describe('toolTrilha()', () => {
    it('deve retornar trilha de Java com sucesso', () => {
      const resp = toolTrilha('java');
      expect(resp.sucesso).toBe(true);
      expect(resp.dados).toBeDefined();
    });

    it('deve retornar lista de todas as trilhas quando sem argumento', () => {
      const resp = toolTrilha();
      expect(resp.sucesso).toBe(true);
      const dados = resp.dados as { trilhas: unknown[] };
      expect(dados.trilhas.length).toBeGreaterThan(0);
    });

    it('deve retornar erro para tecnologia inválida', () => {
      const resp = toolTrilha('cobol');
      expect(resp.sucesso).toBe(false);
      expect(resp.erro).toContain('cobol');
    });

    it('dados da trilha Java devem conter a mensagem formatada', () => {
      const resp = toolTrilha('java');
      const dados = resp.dados as { mensagem: string };
      expect(dados.mensagem).toContain('JAVA');
    });
  });

  describe('toolDesafio()', () => {
    const TEST_DIR = require('path').join(__dirname, '../fixtures/output-tools');

    afterAll(() => {
      const fs = require('fs');
      if (fs.existsSync(TEST_DIR)) {
        fs.rmSync(TEST_DIR, { recursive: true, force: true });
      }
    });

    it('deve gerar desafio java básico com sucesso', () => {
      const resp = toolDesafio('java', 'basico', TEST_DIR);
      expect(resp.sucesso).toBe(true);
      expect(resp.dados).toBeDefined();
    });

    it('deve criar arquivo de desafio no disco', () => {
      const fs = require('fs');
      const resp = toolDesafio('java', 'basico', TEST_DIR);
      const dados = resp.dados as { arquivo: string };
      expect(fs.existsSync(dados.arquivo)).toBe(true);
    });

    it('deve retornar erro para tecnologia inválida', () => {
      const resp = toolDesafio('cobol', 'basico', TEST_DIR);
      expect(resp.sucesso).toBe(false);
    });

    it('deve retornar erro para nível inválido', () => {
      const resp = toolDesafio('java', 'expert', TEST_DIR);
      expect(resp.sucesso).toBe(false);
    });

    it('deve retornar erro quando desafio não existe para a combinação', () => {
      const resp = toolDesafio('python', 'basico', TEST_DIR); // python não tem desafio cadastrado
      expect(resp.sucesso).toBe(false);
    });
  });

  describe('toolCertificado()', () => {
    const TEST_DIR = require('path').join(__dirname, '../fixtures/output-tools-cert');

    afterAll(() => {
      const fs = require('fs');
      if (fs.existsSync(TEST_DIR)) {
        fs.rmSync(TEST_DIR, { recursive: true, force: true });
      }
    });

    it('deve gerar certificado para aluno com sucesso', () => {
      const resp = toolCertificado('Ana Silva', 'java', TEST_DIR);
      expect(resp.sucesso).toBe(true);
      expect(resp.dados).toBeDefined();
    });

    it('deve criar arquivo de certificado no disco', () => {
      const fs = require('fs');
      const resp = toolCertificado('João Costa', 'java', TEST_DIR);
      const dados = resp.dados as { arquivo: string };
      expect(fs.existsSync(dados.arquivo)).toBe(true);
    });

    it('deve retornar erro para nome de aluno vazio', () => {
      const resp = toolCertificado('', 'java', TEST_DIR);
      expect(resp.sucesso).toBe(false);
    });

    it('deve retornar erro para nome de aluno muito curto', () => {
      const resp = toolCertificado('A', 'java', TEST_DIR);
      expect(resp.sucesso).toBe(false);
    });

    it('deve retornar erro para trilha inválida', () => {
      const resp = toolCertificado('Ana Silva', '', TEST_DIR);
      expect(resp.sucesso).toBe(false);
    });
    it('deve recusar certificado para trilha não cadastrada', () => {
      const resp = toolCertificado('Ana Silva', 'inexistente', TEST_DIR);

      expect(resp.sucesso).toBe(false);
      expect(resp.erro).toBe('Trilha não encontrada: inexistente');
      expect(resp.dados).toBeUndefined();
    });
    it('dados do certificado devem conter código de validação', () => {
      const resp = toolCertificado('Maria Oliveira', 'python', TEST_DIR);
      const dados = resp.dados as { certificado: { codigoValidacao: string } };
      expect(dados.certificado.codigoValidacao).toBeTruthy();
      expect(dados.certificado.codigoValidacao.length).toBe(16);
    });
  });

  describe('toolStatus()', () => {
    it('deve retornar status online', () => {
      const resp = toolStatus();
      expect(resp.sucesso).toBe(true);
      const dados = resp.dados as { status: string };
      expect(dados.status).toBe('online');
    });

    it('deve retornar quantidade de trilhas carregadas', () => {
      const resp = toolStatus();
      const dados = resp.dados as { trilhasCarregadas: number };
      expect(dados.trilhasCarregadas).toBeGreaterThan(0);
    });

    it('deve retornar array de tecnologias', () => {
      const resp = toolStatus();
      const dados = resp.dados as { tecnologias: string[] };
      expect(Array.isArray(dados.tecnologias)).toBe(true);
      expect(dados.tecnologias).toContain('java');
    });
  });
});

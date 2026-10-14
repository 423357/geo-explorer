import {
  criarResposta,
  criarErro,
  validarTecnologia,
  validarNivel,
  sanitizarNome,
  gerarTimestamp,
} from '../src/utils/helpers';

describe('Helpers Utils', () => {
  describe('criarResposta()', () => {
    it('deve criar resposta de sucesso com dados', () => {
      const resp = criarResposta({ valor: 42 });
      expect(resp.sucesso).toBe(true);
      expect(resp.dados).toEqual({ valor: 42 });
      expect(resp.timestamp).toBeTruthy();
    });

    it('deve preencher timestamp com ISO string válida', () => {
      const resp = criarResposta('qualquer coisa');
      expect(() => new Date(resp.timestamp)).not.toThrow();
    });

    it('não deve conter campo erro em resposta de sucesso', () => {
      const resp = criarResposta(null);
      expect(resp.erro).toBeUndefined();
    });
  });

  describe('criarErro()', () => {
    it('deve criar resposta de erro com mensagem', () => {
      const resp = criarErro('Algo deu errado');
      expect(resp.sucesso).toBe(false);
      expect(resp.erro).toBe('Algo deu errado');
    });

    it('não deve conter campo dados em resposta de erro', () => {
      const resp = criarErro('Erro X');
      expect(resp.dados).toBeUndefined();
    });
  });

  describe('validarTecnologia()', () => {
    it('deve aceitar tecnologias válidas', () => {
      expect(validarTecnologia('java')).toBe(true);
      expect(validarTecnologia('typescript')).toBe(true);
      expect(validarTecnologia('python')).toBe(true);
    });

    it('deve aceitar tecnologia independente do case', () => {
      expect(validarTecnologia('JAVA')).toBe(true);
      expect(validarTecnologia('Java')).toBe(true);
    });

    it('deve rejeitar tecnologias inválidas', () => {
      expect(validarTecnologia('cobol')).toBe(false);
      expect(validarTecnologia('pascal')).toBe(false);
      expect(validarTecnologia('')).toBe(false);
    });
  });

  describe('validarNivel()', () => {
    it('deve aceitar níveis válidos', () => {
      expect(validarNivel('basico')).toBe(true);
      expect(validarNivel('intermediario')).toBe(true);
      expect(validarNivel('avancado')).toBe(true);
    });

    it('deve rejeitar níveis inválidos', () => {
      expect(validarNivel('expert')).toBe(false);
      expect(validarNivel('')).toBe(false);
      expect(validarNivel('facil')).toBe(false);
    });
  });

  describe('sanitizarNome()', () => {
    it('deve remover caracteres especiais perigosos', () => {
      expect(sanitizarNome('Ana<>Silva')).toBe('AnaSilva');
      expect(sanitizarNome('João/Santos')).toBe('JoãoSantos');
    });

    it('deve fazer trim do nome', () => {
      expect(sanitizarNome('  Ana Silva  ')).toBe('Ana Silva');
    });

    it('deve truncar nomes muito longos', () => {
      const nomeGrande = 'A'.repeat(200);
      expect(sanitizarNome(nomeGrande).length).toBeLessThanOrEqual(100);
    });

    it('deve preservar letras e espaços', () => {
      expect(sanitizarNome('Ana Silva')).toBe('Ana Silva');
    });
  });

  describe('gerarTimestamp()', () => {
    it('deve retornar string não vazia', () => {
      expect(gerarTimestamp()).toBeTruthy();
    });

    it('não deve conter caracteres inválidos para nomes de arquivo', () => {
      const ts = gerarTimestamp();
      expect(ts).not.toMatch(/[:.]/);
    });
  });
});

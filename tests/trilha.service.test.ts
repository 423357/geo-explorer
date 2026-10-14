import {
  buscarTrilha,
  listarTrilhas,
  filtrarPorNivel,
  formatarTrilha,
} from '../src/services/trilha.service';

describe('TrilhaService', () => {
  describe('buscarTrilha()', () => {
    it('deve retornar a trilha de Java quando tecnologia é "java"', () => {
      const trilha = buscarTrilha('java');
      expect(trilha).toBeDefined();
      expect(trilha?.tecnologia).toBe('java');
      expect(trilha?.id).toBe('trilha-java-001');
    });

    it('deve retornar a trilha independente do case ("JAVA")', () => {
      const trilha = buscarTrilha('JAVA');
      expect(trilha).toBeDefined();
      expect(trilha?.tecnologia).toBe('java');
    });

    it('deve retornar a trilha de TypeScript', () => {
      const trilha = buscarTrilha('typescript');
      expect(trilha).toBeDefined();
      expect(trilha?.tecnologia).toBe('typescript');
    });

    it('deve retornar undefined para tecnologia inexistente', () => {
      const trilha = buscarTrilha('cobol');
      expect(trilha).toBeUndefined();
    });

    it('deve retornar trilha com módulos definidos', () => {
      const trilha = buscarTrilha('java');
      expect(trilha?.modulos).toBeDefined();
      expect(trilha?.modulos.length).toBeGreaterThan(0);
    });

    it('deve retornar carga horária maior que zero', () => {
      const trilha = buscarTrilha('java');
      expect(trilha?.duracaoHoras).toBeGreaterThan(0);
    });
  });

  describe('listarTrilhas()', () => {
    it('deve retornar array com trilhas disponíveis', () => {
      const trilhas = listarTrilhas();
      expect(Array.isArray(trilhas)).toBe(true);
      expect(trilhas.length).toBeGreaterThanOrEqual(3);
    });

    it('deve conter trilha de Java', () => {
      const trilhas = listarTrilhas();
      const java = trilhas.find((t) => t.tecnologia === 'java');
      expect(java).toBeDefined();
    });

    it('deve retornar trilhas com todos os campos obrigatórios', () => {
      const trilhas = listarTrilhas();
      trilhas.forEach((t) => {
        expect(t.id).toBeTruthy();
        expect(t.tecnologia).toBeTruthy();
        expect(t.titulo).toBeTruthy();
        expect(t.nivel).toBeTruthy();
        expect(t.duracaoHoras).toBeGreaterThan(0);
        expect(Array.isArray(t.modulos)).toBe(true);
      });
    });
  });

  describe('filtrarPorNivel()', () => {
    it('deve retornar trilhas de nível iniciante', () => {
      const trilhas = filtrarPorNivel('iniciante');
      expect(trilhas.every((t) => t.nivel === 'iniciante')).toBe(true);
    });

    it('deve retornar trilhas de nível intermediario', () => {
      const trilhas = filtrarPorNivel('intermediario');
      expect(trilhas.every((t) => t.nivel === 'intermediario')).toBe(true);
    });

    it('deve retornar array vazio para nível sem trilhas', () => {
      const trilhas = filtrarPorNivel('avancado');
      expect(Array.isArray(trilhas)).toBe(true);
    });
  });

  describe('formatarTrilha()', () => {
    it('deve retornar string contendo o título da trilha', () => {
      const trilha = buscarTrilha('java')!;
      const formatado = formatarTrilha(trilha);
      expect(formatado).toContain(trilha.titulo);
    });

    it('deve conter a tecnologia em maiúsculo', () => {
      const trilha = buscarTrilha('java')!;
      const formatado = formatarTrilha(trilha);
      expect(formatado).toContain('JAVA');
    });

    it('deve listar os módulos formatados', () => {
      const trilha = buscarTrilha('java')!;
      const formatado = formatarTrilha(trilha);
      trilha.modulos.forEach((m) => {
        expect(formatado).toContain(m.titulo);
      });
    });

    it('deve conter a duração em horas', () => {
      const trilha = buscarTrilha('java')!;
      const formatado = formatarTrilha(trilha);
      expect(formatado).toContain(String(trilha.duracaoHoras));
    });
  });
});

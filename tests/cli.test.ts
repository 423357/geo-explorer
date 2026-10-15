import { spawnSync } from 'node:child_process';
import * as path from 'node:path';

describe('CLI do Geo-Explorer', () => {
  it('deve consultar Python pelo terminal', () => {
    const raiz = path.resolve(__dirname, '..');

    const execucao = spawnSync(
      process.execPath,
      ['dist/index.js', 'trilha', 'python'],
      { cwd: raiz, encoding: 'utf-8', timeout: 10000 }
    );

    expect(execucao.error).toBeUndefined();
    expect(execucao.status).toBe(0);

    const resposta = JSON.parse(execucao.stdout);

    expect(resposta.sucesso).toBe(true);
    expect(resposta.dados.trilha.tecnologia).toBe('python');
    expect(resposta.dados.trilha.duracaoHoras).toBe(70);
  });
    it('deve recusar certificado de trilha inexistente pelo terminal', () => {
    const raiz = path.resolve(__dirname, '..');

    const execucao = spawnSync(
      process.execPath,
      ['dist/index.js', 'certificado', 'Ana Silva', 'inexistente'],
      { cwd: raiz, encoding: 'utf-8', timeout: 10000 }
    );

    expect(execucao.error).toBeUndefined();
    expect(execucao.status).toBe(1);

    const resposta = JSON.parse(execucao.stdout);

    expect(resposta.sucesso).toBe(false);
    expect(resposta.erro).toBe('Trilha não encontrada: inexistente');
    expect(resposta.dados).toBeUndefined();
  });
    it('deve orientar e retornar falha quando faltar o nível do desafio', () => {
    const raiz = path.resolve(__dirname, '..');

    const execucao = spawnSync(
      process.execPath,
      ['dist/index.js', 'desafio', 'java'],
      { cwd: raiz, encoding: 'utf-8', timeout: 10000 }
    );

    expect(execucao.error).toBeUndefined();
    expect(execucao.status).toBe(1);
    expect(execucao.stdout).toContain(
      'Uso: node dist/index.js desafio <tecnologia> <nivel>'
    );
  });
});
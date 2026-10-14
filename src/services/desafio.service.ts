import * as fs from 'fs';
import * as path from 'path';
import type { Desafio, NivelDesafio } from '../types/index.js';

const DESAFIOS: Record<string, Record<NivelDesafio, Desafio>> = {
  java: {
    basico: {
      id: 'desafio-java-basico-001',
      titulo: 'Calculadora Simples em Java',
      descricao: 'Implemente uma calculadora com as 4 operações básicas',
      nivel: 'basico',
      tecnologia: 'java',
      enunciado: `
# Desafio: Calculadora Simples em Java

## Descrição
Crie uma classe \`Calculadora\` em Java que implemente as 4 operações aritméticas básicas.

## Requisitos
- Método \`somar(double a, double b)\`
- Método \`subtrair(double a, double b)\`
- Método \`multiplicar(double a, double b)\`
- Método \`dividir(double a, double b)\` — lançar \`ArithmeticException\` se divisor for 0

## Entrada
Dois números reais e um operador (+, -, *, /)

## Saída
O resultado da operação com 2 casas decimais
      `.trim(),
      exemplosEntrada: ['10 + 5', '20 / 4', '3 * 7'],
      exemplosSaida: ['15.00', '5.00', '21.00'],
    },
    intermediario: {
      id: 'desafio-java-inter-001',
      titulo: 'Sistema de Banco com POO',
      descricao: 'Implemente um mini sistema bancário usando Orientação a Objetos',
      nivel: 'intermediario',
      tecnologia: 'java',
      enunciado: `
# Desafio: Mini Sistema Bancário com POO

## Descrição
Crie um sistema bancário simples usando os princípios de POO.

## Requisitos
- Classe abstrata \`Conta\` com atributos: número, titular, saldo
- Classe \`ContaCorrente\` com limite de cheque especial
- Classe \`ContaPoupanca\` com rendimento mensal
- Métodos: \`depositar\`, \`sacar\`, \`transferir\`
- Lançar exceções para operações inválidas

## Entrada
Operações de conta em formato JSON

## Saída
Extrato das operações realizadas
      `.trim(),
      exemplosEntrada: ['{"op":"depositar","valor":1000}', '{"op":"sacar","valor":500}'],
      exemplosSaida: ['Saldo: R$ 1000.00', 'Saldo: R$ 500.00'],
    },
    avancado: {
      id: 'desafio-java-avanc-001',
      titulo: 'API REST com Spring Boot',
      descricao: 'Construa uma API REST completa com Spring Boot e JPA',
      nivel: 'avancado',
      tecnologia: 'java',
      enunciado: `
# Desafio: API REST com Spring Boot

## Descrição
Construa uma API REST de gerenciamento de tarefas (To-Do List) completa.

## Requisitos
- CRUD completo para tarefas
- Autenticação JWT
- Validação de dados com Bean Validation
- Documentação com Swagger/OpenAPI
- Testes unitários com JUnit 5 e Mockito (cobertura >= 80%)
- Banco de dados H2 (testes) e PostgreSQL (produção)

## Endpoints
- POST /api/tarefas
- GET /api/tarefas
- GET /api/tarefas/{id}
- PUT /api/tarefas/{id}
- DELETE /api/tarefas/{id}
      `.trim(),
      exemplosEntrada: ['POST /api/tarefas {"titulo":"Estudar Java","prioridade":"ALTA"}'],
      exemplosSaida: ['201 Created {"id":1,"titulo":"Estudar Java","status":"PENDENTE"}'],
    },
  },
};

export function gerarDesafio(tecnologia: string, nivel: NivelDesafio): Desafio | undefined {
  const tech = tecnologia.toLowerCase();
  return DESAFIOS[tech]?.[nivel];
}

export function salvarDesafio(desafio: Desafio, outputDir: string = 'dist'): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const nomeArquivo = `desafio_${desafio.tecnologia}_${desafio.nivel}_${timestamp}.md`;
  const caminhoCompleto = path.join(outputDir, nomeArquivo);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const conteudo = `---
id: ${desafio.id}
titulo: ${desafio.titulo}
nivel: ${desafio.nivel}
tecnologia: ${desafio.tecnologia}
gerado_em: ${new Date().toISOString()}
---

${desafio.enunciado}

## Exemplos

### Entrada
${desafio.exemplosEntrada.map((e, i) => `${i + 1}. \`${e}\``).join('\n')}

### Saída Esperada
${desafio.exemplosSaida.map((s, i) => `${i + 1}. \`${s}\``).join('\n')}

---
*Desafio gerado pelo IBM Bob Lab MCP — DIO*
`;

  fs.writeFileSync(caminhoCompleto, conteudo, 'utf-8');
  return caminhoCompleto;
}

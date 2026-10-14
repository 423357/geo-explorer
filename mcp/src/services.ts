// services.ts — Lógica de negócio do IBM Bob Lab MCP Server

import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import type { Trilha, Desafio, Certificado, NivelDesafio, NivelTrilha } from './types.js';

// ─── Base de dados de trilhas ─────────────────────────────────────────────────

const TRILHAS_DB: Trilha[] = [
  {
    id: 'trilha-python-001',
    tecnologia: 'python',
    titulo: 'Python AI Developer',
    nivel: 'intermediario',
    duracaoHoras: 70,
    xp: 7000,
    badges: ['Python Basics', 'Data Science', 'Machine Learning', 'IA Generativa'],
    modulos: [
      { id: 'm1', titulo: 'Python Fundamentos', descricao: 'Sintaxe, listas e funções', duracaoHoras: 10, ordem: 1 },
      { id: 'm2', titulo: 'Pandas e NumPy', descricao: 'Manipulação de dados', duracaoHoras: 15, ordem: 2 },
      { id: 'm3', titulo: 'Machine Learning', descricao: 'Scikit-learn e modelos preditivos', duracaoHoras: 25, ordem: 3 },
      { id: 'm4', titulo: 'LLMs e IA Generativa', descricao: 'LangChain, prompts e agentes', duracaoHoras: 20, ordem: 4 },
    ],
  },
  {
    id: 'trilha-java-001',
    tecnologia: 'java',
    titulo: 'Java Developer — Fundamentos ao Avançado',
    nivel: 'iniciante',
    duracaoHoras: 80,
    xp: 8000,
    badges: ['Java OOP', 'Spring Boot', 'JUnit Expert', 'Cloud Deploy'],
    modulos: [
      { id: 'm1', titulo: 'Introdução ao Java', descricao: 'Sintaxe básica, variáveis e tipos', duracaoHoras: 10, ordem: 1 },
      { id: 'm2', titulo: 'Orientação a Objetos', descricao: 'Classes, herança e polimorfismo', duracaoHoras: 15, ordem: 2 },
      { id: 'm3', titulo: 'Collections e Streams', descricao: 'API de coleções e Stream API', duracaoHoras: 12, ordem: 3 },
      { id: 'm4', titulo: 'Spring Boot', descricao: 'APIs REST com Spring', duracaoHoras: 20, ordem: 4 },
      { id: 'm5', titulo: 'Testes com JUnit', descricao: 'Testes unitários e de integração', duracaoHoras: 10, ordem: 5 },
      { id: 'm6', titulo: 'Docker e Deploy', descricao: 'Containerização e CI/CD', duracaoHoras: 13, ordem: 6 },
    ],
  },
  {
    id: 'trilha-typescript-001',
    tecnologia: 'typescript',
    titulo: 'TypeScript Fullstack Developer',
    nivel: 'intermediario',
    duracaoHoras: 60,
    xp: 6000,
    badges: ['TypeScript Pro', 'React Expert', 'Node.js Backend', 'Test Master'],
    modulos: [
      { id: 'm1', titulo: 'TypeScript Essentials', descricao: 'Tipos, interfaces e genéricos', duracaoHoras: 10, ordem: 1 },
      { id: 'm2', titulo: 'Node.js com TypeScript', descricao: 'Backend com Express e TS', duracaoHoras: 15, ordem: 2 },
      { id: 'm3', titulo: 'React com TypeScript', descricao: 'Frontend tipado com React', duracaoHoras: 20, ordem: 3 },
      { id: 'm4', titulo: 'Testes com Jest', descricao: 'Testes unitários com ts-jest', duracaoHoras: 15, ordem: 4 },
    ],
  },
  {
    id: 'trilha-react-001',
    tecnologia: 'react',
    titulo: 'React Developer Moderno',
    nivel: 'intermediario',
    duracaoHoras: 55,
    xp: 5500,
    badges: ['React Hooks', 'Redux Master', 'Next.js Dev', 'Performance Pro'],
    modulos: [
      { id: 'm1', titulo: 'React Fundamentos', descricao: 'Componentes, props e estado', duracaoHoras: 12, ordem: 1 },
      { id: 'm2', titulo: 'Hooks Avançados', descricao: 'useEffect, useContext, custom hooks', duracaoHoras: 13, ordem: 2 },
      { id: 'm3', titulo: 'Gerenciamento de Estado', descricao: 'Redux Toolkit e Zustand', duracaoHoras: 15, ordem: 3 },
      { id: 'm4', titulo: 'Next.js', descricao: 'SSR, SSG e App Router', duracaoHoras: 15, ordem: 4 },
    ],
  },
  {
    id: 'trilha-devops-001',
    tecnologia: 'devops',
    titulo: 'DevOps & Cloud Engineer',
    nivel: 'avancado',
    duracaoHoras: 90,
    xp: 9000,
    badges: ['Docker Expert', 'Kubernetes Master', 'CI/CD Pro', 'Cloud Architect'],
    modulos: [
      { id: 'm1', titulo: 'Linux e Shell Script', descricao: 'Fundamentos de sistemas Unix', duracaoHoras: 15, ordem: 1 },
      { id: 'm2', titulo: 'Docker e Containers', descricao: 'Imagens, volumes e redes', duracaoHoras: 20, ordem: 2 },
      { id: 'm3', titulo: 'Kubernetes', descricao: 'Orquestração de containers', duracaoHoras: 25, ordem: 3 },
      { id: 'm4', titulo: 'CI/CD com GitHub Actions', descricao: 'Pipelines de entrega contínua', duracaoHoras: 15, ordem: 4 },
      { id: 'm5', titulo: 'Cloud AWS/Azure', descricao: 'Infraestrutura em nuvem', duracaoHoras: 15, ordem: 5 },
    ],
  },
];

// ─── Base de dados de desafios ────────────────────────────────────────────────

const DESAFIOS_DB: Record<string, Record<NivelDesafio, Desafio>> = {
  java: {
    Basico: {
      id: 'desafio-java-basico-001',
      titulo: 'Calculadora Simples em Java',
      descricao: 'Implemente uma calculadora com as 4 operações básicas',
      nivel: 'Basico',
      tecnologia: 'java',
      enunciado: `# Desafio: Calculadora Simples em Java\n\nCrie uma classe \`Calculadora\` com os métodos: somar, subtrair, multiplicar e dividir.\nLançar \`ArithmeticException\` ao dividir por zero.`,
      dicas: ['Use double para os parâmetros', 'Valide o divisor antes de dividir', 'Implemente testes com JUnit'],
      exemplosEntrada: ['10 + 5', '20 / 4', '3 * 7'],
      exemplosSaida: ['15.00', '5.00', '21.00'],
    },
    Intermediario: {
      id: 'desafio-java-inter-001',
      titulo: 'Sistema Bancário com POO',
      descricao: 'Implemente um mini sistema bancário com Orientação a Objetos',
      nivel: 'Intermediario',
      tecnologia: 'java',
      enunciado: `# Desafio: Mini Sistema Bancário\n\nCrie classes: \`Conta\` (abstrata), \`ContaCorrente\` e \`ContaPoupanca\`.\nImplemente: depositar, sacar, transferir com validações.`,
      dicas: ['Use classes abstratas', 'Aplique encapsulamento', 'Trate exceções de saldo insuficiente'],
      exemplosEntrada: ['{"op":"depositar","valor":1000}', '{"op":"sacar","valor":500}'],
      exemplosSaida: ['Saldo: R$ 1000.00', 'Saldo: R$ 500.00'],
    },
    Avancado: {
      id: 'desafio-java-avanc-001',
      titulo: 'API REST com Spring Boot',
      descricao: 'Construa uma API REST completa com Spring Boot e JPA',
      nivel: 'Avancado',
      tecnologia: 'java',
      enunciado: `# Desafio: API REST com Spring Boot\n\nConstrua uma To-Do List API com CRUD completo, autenticação JWT,\nvalidação Bean Validation, Swagger/OpenAPI e testes (cobertura >= 80%).`,
      dicas: ['Use Spring Data JPA', 'Configure Spring Security para JWT', 'Documente com @Operation do Swagger'],
      exemplosEntrada: ['POST /api/tarefas {"titulo":"Estudar Java","prioridade":"ALTA"}'],
      exemplosSaida: ['201 Created {"id":1,"titulo":"Estudar Java","status":"PENDENTE"}'],
    },
  },
  python: {
    Basico: {
      id: 'desafio-python-basico-001',
      titulo: 'Análise de Lista em Python',
      descricao: 'Manipule listas e aplique funções de alta ordem',
      nivel: 'Basico',
      tecnologia: 'python',
      enunciado: `# Desafio: Análise de Lista\n\nDada uma lista de números, calcule: média, mediana, moda e desvio padrão.\nSem usar bibliotecas externas.`,
      dicas: ['Use sorted() para a mediana', 'Counter do collections para moda', 'math.sqrt para desvio padrão'],
      exemplosEntrada: ['[4, 7, 13, 2, 7, 4, 4]'],
      exemplosSaida: ['Média: 5.86, Mediana: 4, Moda: 4'],
    },
    Intermediario: {
      id: 'desafio-python-inter-001',
      titulo: 'Análise de Dados com Pandas',
      descricao: 'Processe e analise um dataset CSV com Pandas',
      nivel: 'Intermediario',
      tecnologia: 'python',
      enunciado: `# Desafio: Análise com Pandas\n\nCarregue um CSV de vendas, calcule: total por categoria, produto mais vendido,\nmês com maior receita e exporte um relatório em Excel.`,
      dicas: ['Use groupby() para agregar', 'idxmax() para o maior valor', 'to_excel() para exportar'],
      exemplosEntrada: ['vendas.csv com colunas: data, produto, categoria, quantidade, preco'],
      exemplosSaida: ['relatorio_vendas.xlsx com 3 abas: resumo, por_categoria, top_produtos'],
    },
    Avancado: {
      id: 'desafio-python-avanc-001',
      titulo: 'Chatbot com LangChain',
      descricao: 'Construa um chatbot RAG com LangChain e OpenAI',
      nivel: 'Avancado',
      tecnologia: 'python',
      enunciado: `# Desafio: Chatbot RAG\n\nConstrua um chatbot que responde perguntas sobre documentos PDF usando RAG.\nUse: LangChain, OpenAI Embeddings, FAISS e Streamlit para a UI.`,
      dicas: ['PyPDFLoader para carregar PDFs', 'RecursiveCharacterTextSplitter para chunks', 'ConversationalRetrievalChain para o RAG'],
      exemplosEntrada: ['manual_produto.pdf + "Qual é a garantia do produto?"'],
      exemplosSaida: ['O produto possui garantia de 12 meses conforme seção 4.2 do manual.'],
    },
  },
  typescript: {
    Basico: {
      id: 'desafio-ts-basico-001',
      titulo: 'Tipagem Avançada em TypeScript',
      descricao: 'Aplique tipos avançados do TypeScript',
      nivel: 'Basico',
      tecnologia: 'typescript',
      enunciado: `# Desafio: Tipos Avançados\n\nCrie um sistema de tipos para um e-commerce: Product, Cart, Order.\nUse: generics, union types, conditional types e utility types.`,
      dicas: ['Use Partial<T> para updates', 'Readonly<T> para imutabilidade', 'Record<K,V> para mappings'],
      exemplosEntrada: ['type CartItem = { product: Product; quantity: number }'],
      exemplosSaida: ['Sistema tipado compilando sem erros com strict: true'],
    },
    Intermediario: {
      id: 'desafio-ts-inter-001',
      titulo: 'API REST com Express + TypeScript',
      descricao: 'Construa uma API tipada com Express e TypeScript',
      nivel: 'Intermediario',
      tecnologia: 'typescript',
      enunciado: `# Desafio: API com Express + TypeScript\n\nCrie uma API de gerenciamento de tarefas com Express tipado,\nvalidação com Zod, testes com Jest e documentação OpenAPI.`,
      dicas: ['Use express.Router() tipado', 'Zod para validar request body', 'supertest para testar endpoints'],
      exemplosEntrada: ['POST /tasks {"title":"Estudar TS","priority":"high"}'],
      exemplosSaida: ['201 {"id":"uuid","title":"Estudar TS","done":false}'],
    },
    Avancado: {
      id: 'desafio-ts-avanc-001',
      titulo: 'Monorepo Fullstack com Next.js',
      descricao: 'Configure um monorepo TypeScript com Next.js e NestJS',
      nivel: 'Avancado',
      tecnologia: 'typescript',
      enunciado: `# Desafio: Monorepo Fullstack\n\nConfigure um monorepo com Turborepo contendo:\n- apps/web (Next.js 14 com App Router)\n- apps/api (NestJS)\n- packages/shared (tipos compartilhados)`,
      dicas: ['Use Turborepo para build pipeline', 'Compartilhe tipos via packages/shared', 'Configure paths no tsconfig base'],
      exemplosEntrada: ['turbo build', 'turbo test'],
      exemplosSaida: ['Build paralelo dos dois apps em < 30s'],
    },
  },
};

// ─── Funções de serviço ───────────────────────────────────────────────────────

export function buscarTrilha(tecnologia: string): Trilha | undefined {
  return TRILHAS_DB.find((t) => t.tecnologia.toLowerCase() === tecnologia.toLowerCase());
}

export function listarTrilhas(): Trilha[] {
  return TRILHAS_DB;
}

export function filtrarPorNivel(nivel: NivelTrilha): Trilha[] {
  return TRILHAS_DB.filter((t) => t.nivel === nivel);
}

export function formatarTrilha(trilha: Trilha): string {
  const modulos = trilha.modulos
    .map((m) => `  ${m.ordem}. ${m.titulo} (${m.duracaoHoras}h) — ${m.descricao}`)
    .join('\n');
  const badges = trilha.badges.map((b) => `🏅 ${b}`).join('  ');

  return `
🎯 ${trilha.titulo}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏷️  Tecnologia : ${trilha.tecnologia.toUpperCase()}
📊 Nível       : ${trilha.nivel}
⏱️  Duração     : ${trilha.duracaoHoras} horas
⭐ XP           : ${trilha.xp.toLocaleString('pt-BR')} pontos
${badges}
📚 Módulos (${trilha.modulos.length}):
${modulos}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `.trim();
}

export function gerarDesafio(tecnologia: string, nivel: NivelDesafio): Desafio | undefined {
  return DESAFIOS_DB[tecnologia.toLowerCase()]?.[nivel];
}

export function salvarDesafio(desafio: Desafio, outputDir: string = 'dist'): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const nomeArquivo = `desafio_${desafio.tecnologia}_${desafio.nivel.toLowerCase()}_${timestamp}.md`;
  const caminhoCompleto = path.join(outputDir, nomeArquivo);

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const conteudo = `---
id: ${desafio.id}
titulo: ${desafio.titulo}
nivel: ${desafio.nivel}
tecnologia: ${desafio.tecnologia}
gerado_em: ${new Date().toISOString()}
---

${desafio.enunciado}

## Dicas
${desafio.dicas.map((d) => `- ${d}`).join('\n')}

## Exemplos de Entrada
${desafio.exemplosEntrada.map((e, i) => `${i + 1}. \`${e}\``).join('\n')}

## Saída Esperada
${desafio.exemplosSaida.map((s, i) => `${i + 1}. \`${s}\``).join('\n')}

---
*Desafio gerado pelo IBM Bob Lab MCP — DIO*
`;

  fs.writeFileSync(caminhoCompleto, conteudo, 'utf-8');
  return caminhoCompleto;
}

export function gerarCertificado(alunoNome: string, trilhaNome: string, cargaHoraria: number): Certificado {
  return {
    id: `cert-${Date.now()}`,
    alunoNome,
    trilha: trilhaNome,
    dataEmissao: new Date().toLocaleDateString('pt-BR'),
    codigoValidacao: crypto.randomBytes(8).toString('hex').toUpperCase(),
    cargaHoraria,
    plataforma: 'DIO — Digital Innovation One',
  };
}

export function salvarCertificado(cert: Certificado, outputDir: string = 'dist'): string {
  const nomeArquivo = `certificado_${cert.alunoNome.replace(/\s+/g, '_')}_${cert.trilha}_${Date.now()}.md`;
  const caminhoCompleto = path.join(outputDir, nomeArquivo);

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const conteudo = `# 🏆 Certificado de Conclusão

**Plataforma:** ${cert.plataforma}

---

Certificamos que

## ${cert.alunoNome.toUpperCase()}

concluiu com êxito a trilha

## ${cert.trilha.toUpperCase()}

---

📅 **Data de Emissão:** ${cert.dataEmissao}
⏱️ **Carga Horária:** ${cert.cargaHoraria} horas
🔑 **Código de Validação:** \`${cert.codigoValidacao}\`
🆔 **ID do Certificado:** \`${cert.id}\`

---
*Emitido pelo IBM Bob Lab MCP — DIO*
`;

  fs.writeFileSync(caminhoCompleto, conteudo, 'utf-8');
  return caminhoCompleto;
}

export function formatarCertificado(cert: Certificado): string {
  return `
🏆 CERTIFICADO EMITIDO COM SUCESSO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Aluno     : ${cert.alunoNome}
📚 Trilha    : ${cert.trilha}
📅 Emissão   : ${cert.dataEmissao}
⏱️  Carga    : ${cert.cargaHoraria}h
🔑 Código    : ${cert.codigoValidacao}
🏢 Plataforma: ${cert.plataforma}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `.trim();
}

export function listarTecnologias(): string[] {
  return [
    'python', 'java', 'javascript', 'typescript', 'react', 'nodejs',
    'angular', 'vue', 'csharp', 'dotnet', 'go', 'rust', 'kotlin',
    'swift', 'php', 'ruby', 'scala', 'dart', 'flutter', 'devops',
  ];
}

# 📚 Documentação Completa — IBM Bob Lab + DIO

> Guia completo do projeto: prompts utilizados, modos de uso, dicas práticas
> e insights para futuros profissionais que aprenderão com este material.

---

## 🎯 Visão Geral do Projeto

O **IBM Bob Lab** é um projeto educacional que une:
- **IBM Bob** (Roo-Cline) — agente de IA com suporte ao protocolo MCP
- **Digital Innovation One (DIO)** — plataforma de trilhas e bootcamps
- **Model Context Protocol (MCP)** — protocolo que permite ao Bob acessar ferramentas externas

O resultado é um servidor MCP local que transforma o IBM Bob em um **mentor de estudos DIO**,
capaz de montar planos de estudos, gerar desafios de código e emitir certificados fictícios.

---

## 🧩 Arquitetura do Projeto

```
ibm-bob-lab-/
├── .bob/                          # Configurações locais do IBM Bob
│   └── commands/                  # Slash commands locais (visíveis no chat)
│       ├── trilha.md              # /trilha <tecnologia>
│       ├── desafio.md             # /desafio <tecnologia> <nivel>
│       └── certificado.md         # /certificado <nome> <trilha>
│
├── dio-explore/                   # Projeto Principal DIO Explore
│   ├── CRC/                       # Componentes Reutilizáveis e Configurações
│   ├── DATA/                      # Dados estáticos
│   │   └── trilhas_dio.json       # 30 trilhas fictícias completas
│   ├── COMMANDS/                  # Documentação dos comandos slash
│   │   ├── trilha.md
│   │   ├── desafio.md
│   │   └── certificado.md
│   ├── MCP/                       # Referências e configs do servidor MCP
│   ├── DOCS/                      # Documentos gerados (desafios, certificados)
│   └── src/                       # Código-fonte auxiliar
│
├── mcp/                           # Servidor MCP TypeScript
│   ├── src/
│   │   ├── index.ts               # Entry point — suporte stdio + HTTP
│   │   ├── tools.ts               # 4 ferramentas MCP registradas
│   │   ├── services.ts            # Lógica de negócio
│   │   └── types.ts               # Tipos TypeScript
│   ├── README.md                  # Docs do servidor MCP
│   ├── GUIA_INSTALACAO.md
│   ├── EXEMPLO_CONFIGURACAO.md
│   └── RESUMO_MCP_SERVER.md
│
├── src/                           # Código-fonte principal do projeto
│   ├── index.ts                   # Entry point demonstrativo
│   ├── config/                    # Configurações gerais
│   ├── services/
│   │   ├── trilha.service.ts      # Busca e formata trilhas
│   │   ├── desafio.service.ts     # Gera e salva desafios
│   │   └── certificado.service.ts # Gera e salva certificados
│   ├── tools/
│   │   └── commands.ts            # Handlers dos comandos slash
│   ├── types/index.ts             # Interfaces TypeScript
│   └── utils/helpers.ts           # Utilitários e validações
│
├── tests/                         # Testes unitários e de integração
│   ├── trilha.service.test.ts     # 16 testes
│   ├── desafio.service.test.ts    # 12 testes
│   ├── certificado.service.test.ts # 14 testes
│   ├── helpers.test.ts            # 16 testes
│   ├── commands.test.ts           # 18 testes
│   └── integration/
│       └── fluxo-completo.test.ts # 5 testes de integração
│
├── dist/                          # Build compilado
├── coverage/                      # Relatório de cobertura de testes
├── docs/                          # Documentação estática do projeto
├── fixtures/                      # Dados de teste
├── Hello_World.md                 # Arquivo de boas-vindas
├── .bobignore                     # Ignora node_modules, .env, cache, etc.
├── .gitignore                     # Ignora artefatos de build e dependências
├── COMANDOS_SLASH.md              # Referência rápida dos comandos
├── RESULTADO_TESTES.txt           # Relatório completo dos 81 testes
├── README.md                      # Este arquivo
├── jest.config.js                 # Configuração do Jest
├── package.json                   # Dependências e scripts npm
└── tsconfig.json                  # Configuração TypeScript
```

---

## 🛠️ Prompts Utilizados Durante o Projeto

### Aula 1 — Setup e Contexto Persistente
```
Crie um arquivo AGENTS.md na raiz do workspace com o contexto persistente
do projeto IBM Bob + Appwrite. Inclua: objetivo do projeto, progresso do curso,
estrutura de pastas, convenções adotadas e ponto de retorno para próximas sessões.
```

### Aula 2 — Banco de Dados com Appwrite
```
Crie um banco de dados no Appwrite chamado "Agente Bob" com 5 coleções:
Alunos, Professores, Aulas, Artigos e Avaliações. Cada coleção deve ter
atributos relevantes. Insira pelo menos 3 documentos em cada coleção.
```

### Aula 3 — Servidor MCP
```
Configure o Git globalmente com credential.helper=store.
Crie dentro do repositório clonado um arquivo Hello_World.md.
Crie a estrutura: dio-explore/ com pastas CRC, DATA, COMMANDS, MCP e DOCS.
Crie trilhas_dio.json com 30 trilhas fictícias da DIO contendo: nome, tecnologia,
nível, número de módulos, XP total, beds disponíveis, promoção vitalício e lives ao vivo.
Crie um .bobignore ignorando: node_modules, .env, data/cache-progresso,
docs/certificados-emitidos e arquivos .temp.
Crie slash commands /trilha, /desafio e /certificado armazenados localmente
(visíveis no chat do Bob).
Crie testes unitários com cobertura >= 70%.
Crie um servidor MCP com suporte a stdio e HTTP na pasta mcp/.
Documente todo o projeto.
```

---

## 🎮 Modos de Uso — Slash Commands

### `/trilha <tecnologia>`

Consulta o plano de estudos de uma trilha DIO a partir do JSON local.

**Exemplos:**
```
/trilha Java
/trilha Python
/trilha Kubernetes
/trilha React
/trilha LLM
```

**O que retorna:**
- Nome e nível da trilha
- Total de módulos e XP
- Vagas (beds) disponíveis
- Se há promoção vitalício
- Número de lives ao vivo
- Lista numerada de todos os módulos

---

### `/desafio <tecnologia> <nivel>`

Gera um desafio de código contextualizado com a trilha escolhida.

**Exemplos:**
```
/desafio Java iniciante
/desafio Python avancado
/desafio TypeScript intermediario
/desafio React basico
```

**O que retorna:**
- Enunciado do desafio
- 3 requisitos técnicos
- 1 dica de abordagem
- Exemplo de entrada/saída
- Arquivo `.md` salvo em `dio-explore/DOCS/`

---

### `/certificado <nome_aluno> <trilha>`

Emite um certificado fictício de conclusão de trilha.

**Exemplos:**
```
/certificado "Ana Silva" Java
/certificado "Carlos Mendes" Python
/certificado "Maria Oliveira" React
```

**O que retorna:**
- Certificado formatado com nome do aluno
- Data de emissão, nível, módulos e XP
- Código único de validação (16 chars)
- Link de validação fictício na DIO
- Arquivo `.md` salvo em `dio-explore/DOCS/`

---

## 🌐 Servidor MCP — Modos de Execução

### Modo stdio (IBM Bob / Claude Desktop)
```bash
cd ibm-bob-lab-/mcp
npm install
npm run build
npm start
```

Adicione ao `.bob/mcp.json`:
```json
{
  "mcpServers": {
    "ibm-bob-lab": {
      "command": "node",
      "args": ["C:/Users/Alex/.bob/playground/ibm-bob-lab-/mcp/dist/index.js"]
    }
  }
}
```

### Modo HTTP (Acesso remoto / API / HTTPS)
```bash
MCP_TRANSPORT=http PORT=3100 node mcp/dist/index.js
```

Acesse em: `http://localhost:3100`

### Ferramentas MCP disponíveis:
| Ferramenta          | Descrição                                     |
|---------------------|-----------------------------------------------|
| `buscar_trilha`     | Plano de estudos completo com módulos e XP    |
| `gerar_desafio`     | Desafio de código com requisitos e dicas      |
| `gerar_certificado` | Certificado Markdown com código de validação  |
| `listar_tecnologias`| Lista todas as 20+ tecnologias disponíveis    |

---

## 🧪 Testes — Resultados

```
Test Suites : 6 passaram / 0 falharam
Testes      : 81 passaram / 0 falharam
Cobertura   : 99% statements / 99% lines / 77% branches
Meta mínima : 70% ✅ SUPERADA
```

Executar testes:
```bash
npm test              # roda testes + cobertura
npm run test:ci       # modo CI com threshold de 70%
npm run test:watch    # modo watch (desenvolvimento)
```

---

## 💡 Dicas de Uso

### Para Estudantes Iniciantes
1. **Comece pela `/trilha`** — entenda o que você vai aprender antes de começar
2. **Use `/desafio iniciante`** — pratique sem pressão, o nível básico é para fixar o conteúdo
3. **Só gere o `/certificado`** quando realmente estudar os módulos — sirva como motivação!

### Para Estudantes Intermediários
1. Explore trilhas de nível Avançado com `/trilha Kubernetes` ou `/trilha Microservices`
2. Use `/desafio <tech> avancado` para se preparar para entrevistas técnicas
3. Contribua com novas trilhas no `trilhas_dio.json`

### Para Professores e Instrutores
1. O arquivo `trilhas_dio.json` pode ser facilmente expandido com novas trilhas reais ou fictícias
2. Os slash commands funcionam como templates reutilizáveis — adapte os prompts conforme a turma
3. Use o servidor MCP no modo HTTP para integrar com outros sistemas

### Para Devs que Querem Estender o Projeto
1. Adicione autenticação OAuth2 ao servidor MCP HTTP para produção
2. Implemente persistência real com banco de dados (Appwrite, PostgreSQL)
3. Crie um frontend Next.js que consome as ferramentas MCP via API REST
4. Publique o servidor como pacote npm para facilitar a instalação

---

## 🔮 Insights para Futuros Profissionais

### Sobre o Model Context Protocol (MCP)
> O MCP é o futuro da integração entre agentes de IA e sistemas externos.
> Aprender a construir servidores MCP hoje é equivalente a aprender REST APIs em 2010 —
> quem dominar isso primeiro terá uma vantagem competitiva enorme no mercado.

### Sobre IBM Bob
> IBM Bob não é apenas um assistente de código. Com MCP, ele se torna um orquestrador
> que pode acessar bancos de dados, APIs externas, sistemas legados e ferramentas de DevOps
> de forma nativa e segura. Pense nele como um desenvolvedor sênior com acesso a todas as
> suas ferramentas ao mesmo tempo.

### Sobre o Mercado de Trabalho
> Empresas estão começando a contratar **"AI Engineers"** — profissionais que sabem:
> - Construir e integrar agentes de IA com sistemas existentes
> - Escrever prompts técnicos precisos (Prompt Engineering)
> - Criar servidores MCP e conectar ferramentas ao contexto do agente
> - Garantir segurança e observabilidade em fluxos de IA
>
> Este projeto te prepara exatamente para esse perfil.

### Sobre DIO e Aprendizado Acelerado
> A DIO oferece trilhas práticas que combinam teoria e projeto.
> O segredo do aprendizado acelerado é: **trilha → desafio → certificado → próxima trilha**.
> Não pule etapas. Cada módulo existe por um motivo.

---

## 📋 Checklist de Conclusão do Projeto

- [x] Git configurado com credential.helper persistente
- [x] Repositório clonado com Hello_World.md
- [x] Estrutura de pastas criada (CRC, DATA, COMMANDS, MCP, DOCS)
- [x] 30 trilhas fictícias DIO em `trilhas_dio.json`
- [x] `.bobignore` configurado
- [x] Slash commands `/trilha`, `/desafio`, `/certificado` funcionando
- [x] 81 testes unitários passando (cobertura 99%)
- [x] Servidor MCP com suporte stdio + HTTP
- [x] Documentação completa gerada

---

## 🔗 Links Úteis

| Recurso | URL |
|---------|-----|
| DIO — Digital Innovation One | https://web.dio.me/ |
| Model Context Protocol | https://modelcontextprotocol.io/ |
| IBM Bob Documentação | https://ibm.com/bob |
| Appwrite Cloud | https://appwrite.io/ |
| Node.js | https://nodejs.org/ |
| TypeScript | https://typescriptlang.org/ |

---

*Documentação gerada pelo IBM Bob Lab — Bootcamp IBM Bob + Appwrite*
*Versão: 1.0.0 | Data: 2025-06-23*

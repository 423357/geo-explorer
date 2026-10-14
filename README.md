# 🤖 IBM Bob Lab — DIO Explorer

> Projeto educacional do **Bootcamp IBM Bob + Appwrite** que transforma o IBM Bob em um
> mentor de estudos da [DIO — Digital Innovation One](https://web.dio.me/), com trilhas,
> desafios de código e certificados gerados via slash commands e servidor MCP.

---

## 🚀 Quick Start

```bash
# Clonar o repositório
git clone <url-do-repo> ibm-bob-lab-
cd ibm-bob-lab-

# Instalar dependências (projeto principal)
npm install

# Rodar testes
npm test

# Compilar
npm run build
```

Para o servidor MCP:
```bash
cd mcp
npm install
npm run build
npm start          # modo stdio (IBM Bob / Claude Desktop)
# ou
MCP_TRANSPORT=http PORT=3100 npm start  # modo HTTP/API
```

---

## 🎮 Slash Commands Disponíveis

> Estes comandos ficam armazenados em `.bob/commands/` e são visíveis no chat do IBM Bob.

| Comando | Uso | Descrição |
|---------|-----|-----------|
| `/trilha` | `/trilha Java` | Plano de estudos completo da trilha |
| `/desafio` | `/desafio Python intermediario` | Desafio de código contextualizado |
| `/certificado` | `/certificado "Ana Silva" Java` | Certificado fictício de conclusão |

---

## 🗂️ Estrutura Completa do Projeto

```
ibm-bob-lab-/
│
├── 📄 Hello_World.md              ← Arquivo de boas-vindas
├── 📄 .bobignore                  ← Ignora node_modules, .env, cache, *.temp
├── 📄 .gitignore                  ← Ignora dist, coverage, node_modules
├── 📄 COMANDOS_SLASH.md           ← Referência rápida dos comandos
├── 📄 RESULTADO_TESTES.txt        ← Relatório dos 81 testes unitários
├── 📄 README.md                   ← Este arquivo
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 jest.config.js
│
├── 📁 .bob/                       ← Configurações locais do IBM Bob
│   └── 📁 commands/               ← Slash commands (visíveis no chat)
│       ├── trilha.md              ← /trilha <tecnologia>
│       ├── desafio.md             ← /desafio <tecnologia> <nivel>
│       └── certificado.md         ← /certificado <nome> <trilha>
│
├── 📁 dio-explore/                ← Projeto Final DIO Explore
│   ├── 📁 CRC/                    ← Componentes Reutilizáveis e Configurações
│   ├── 📁 DATA/                   ← Dados estáticos
│   │   └── trilhas_dio.json       ← 30 trilhas fictícias completas da DIO
│   ├── 📁 COMMANDS/               ← Documentação dos slash commands
│   │   ├── trilha.md
│   │   ├── desafio.md
│   │   └── certificado.md
│   ├── 📁 MCP/                    ← Referências do servidor MCP
│   ├── 📁 DOCS/                   ← Desafios e certificados gerados
│   └── 📁 src/                    ← Código auxiliar
│
├── 📁 mcp/                        ← Servidor MCP TypeScript
│   ├── 📁 src/
│   │   ├── index.ts               ← Entry point (stdio + HTTP)
│   │   ├── tools.ts               ← 4 ferramentas MCP
│   │   ├── services.ts            ← Lógica de negócio
│   │   └── types.ts               ← Tipos TypeScript
│   ├── 📄 README.md
│   ├── 📄 GUIA_INSTALACAO.md
│   ├── 📄 EXEMPLO_CONFIGURACAO.md
│   ├── 📄 RESUMO_MCP_SERVER.md
│   ├── 📄 package.json
│   └── 📄 tsconfig.json
│
├── 📁 src/                        ← Código-fonte principal
│   ├── index.ts                   ← Entry point demonstrativo
│   ├── 📁 config/
│   ├── 📁 services/
│   │   ├── trilha.service.ts      ← Busca/lista/formata trilhas
│   │   ├── desafio.service.ts     ← Gera e salva desafios por nível
│   │   └── certificado.service.ts ← Emite e salva certificados
│   ├── 📁 tools/
│   │   └── commands.ts            ← Handlers dos slash commands
│   ├── 📁 types/
│   │   └── index.ts               ← Interfaces e tipos globais
│   └── 📁 utils/
│       └── helpers.ts             ← Validações e utilitários
│
├── 📁 tests/                      ← Testes unitários e integração
│   ├── trilha.service.test.ts     ← 16 testes
│   ├── desafio.service.test.ts    ← 12 testes
│   ├── certificado.service.test.ts ← 14 testes
│   ├── helpers.test.ts            ← 16 testes
│   ├── commands.test.ts           ← 18 testes
│   └── 📁 integration/
│       └── fluxo-completo.test.ts ← 5 testes de integração
│
├── 📁 docs/                       ← Documentação do projeto
│   └── DOCUMENTACAO_COMPLETA.md  ← Prompts, modos de uso, dicas, insights
│
├── 📁 dist/                       ← Build compilado (gerado via npm run build)
├── 📁 coverage/                   ← Relatório de cobertura (gerado via npm test)
└── 📁 fixtures/                   ← Dados de fixture para testes
```

---

## 📊 Resultados dos Testes

| Métrica       | Resultado |
|---------------|-----------|
| Test Suites   | 6 / 6 ✅  |
| Testes        | 81 / 81 ✅ |
| Cobertura     | 99%       |
| Meta mínima   | 70% ✅    |

---

## 🔌 Integração com IBM Bob

Adicione ao `.bob/mcp.json` do workspace:

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

---

## 🌐 Ferramentas MCP

| Ferramenta            | Descrição                                        |
|-----------------------|--------------------------------------------------|
| `buscar_trilha`       | Plano de estudos completo com módulos, XP, lives |
| `gerar_desafio`       | Desafio de código com requisitos, dicas, exemplos |
| `gerar_certificado`   | Certificado Markdown com código de validação     |
| `listar_tecnologias`  | Lista 20+ tecnologias disponíveis                |

---

## 📁 Dados — trilhas_dio.json

O arquivo [`dio-explore/DATA/trilhas_dio.json`](./dio-explore/DATA/trilhas_dio.json) contém
**30 trilhas fictícias** com os campos:

| Campo              | Descrição                          |
|--------------------|------------------------------------|
| `nome`             | Nome completo da trilha            |
| `tecnologia`       | Tecnologia principal               |
| `nivel`            | Iniciante / Intermediário / Avançado |
| `totalModulos`     | Número de módulos                  |
| `xpTotal`          | XP total ao concluir               |
| `bedsDisponiveis`  | Vagas abertas na plataforma        |
| `promocaoVitalicio`| Tem promoção vitalício? (true/false)|
| `livesAoVivo`      | Número de lives ao vivo disponíveis|
| `modulos`          | Lista detalhada dos módulos        |

---

## 📋 Tecnologias Utilizadas

- **TypeScript 5** — linguagem principal
- **Node.js 20** — runtime
- **Jest 29 + ts-jest** — testes unitários
- **@modelcontextprotocol/sdk** — servidor MCP
- **Express + CORS** — servidor HTTP para modo remoto
- **IBM Bob** — agente de IA que consome o servidor MCP

---

## 📄 Licença

MIT — IBM Bob Lab / Digital Innovation One

---

*Bootcamp IBM Bob + Appwrite | Aula 3 — Servidor MCP, Documentação e Publicação*

# 🤖 IBM Bob Lab — MCP Server

> Servidor MCP (Model Context Protocol) completo para o **IBM Bob Lab** que permite acesso programático às funcionalidades da plataforma DIO através de agentes de IA como **IBM Bob** (Roo-Cline) e **Claude Desktop**.

---

## 🎯 O que é este projeto?

Este servidor expõe as funcionalidades do **IBM Bob Lab** como ferramentas MCP, permitindo que qualquer agente de IA compatível com o protocolo MCP possa:

- 📚 Buscar trilhas de aprendizado DIO com módulos, XP e badges
- 💻 Gerar desafios de código com requisitos, dicas e exemplos
- 🏆 Emitir certificados de conclusão em Markdown
- 🔍 Listar todas as tecnologias disponíveis

---

## 🗂️ Estrutura do Projeto

```
mcp/
├── src/
│   ├── index.ts        # Servidor MCP principal (ponto de entrada)
│   ├── tools.ts        # Definições das 4 ferramentas MCP
│   ├── services.ts     # Lógica de negócio e base de dados
│   └── types.ts        # Tipos TypeScript
├── dist/               # Código compilado (gerado automaticamente)
├── package.json        # Dependências e scripts
├── tsconfig.json       # Configuração TypeScript
├── .gitignore          # Arquivos ignorados pelo Git
├── README.md           # Esta documentação
├── GUIA_INSTALACAO.md  # Guia passo a passo de instalação
├── EXEMPLO_CONFIGURACAO.md  # Exemplos práticos de configuração
└── RESUMO_MCP_SERVER.md     # Visão geral completa do servidor
```

---

## 🚀 Ferramentas MCP Disponíveis

### 1. `buscar_trilha`
Busca informações detalhadas sobre trilhas de aprendizado.

| Campo | Descrição |
|---|---|
| **Entrada** | `tecnologia` (opcional) — Nome da tecnologia |
| **Saída** | Plano de estudos completo com módulos, XP, badges e fases |

```
Sem parâmetro → lista todas as trilhas disponíveis
Com parâmetro → detalha a trilha da tecnologia informada
```

### 2. `gerar_desafio`
Gera desafios de código com descrição, requisitos, dicas e exemplos.

| Campo | Descrição |
|---|---|
| **Entrada** | `tecnologia`, `nivel` (Basico/Intermediario/Avancado), `outputDir` (opcional) |
| **Saída** | Desafio com enunciado, dicas e exemplos. Arquivo `.md` salvo em disco |

### 3. `gerar_certificado`
Emite certificados de conclusão formatados em Markdown.

| Campo | Descrição |
|---|---|
| **Entrada** | `alunoNome`, `trilhaNome`, `outputDir` (opcional) |
| **Saída** | Certificado formatado e salvo em arquivo `.md` |

### 4. `listar_tecnologias`
Lista todas as 20+ tecnologias disponíveis no servidor.

| Campo | Descrição |
|---|---|
| **Entrada** | Nenhuma |
| **Saída** | Lista completa de tecnologias suportadas |

---

## ⚡ Quick Start

```bash
# 1. Entrar na pasta mcp
cd ibm-bob-lab-/mcp

# 2. Instalar dependências
npm install

# 3. Compilar
npm run build

# 4. Iniciar o servidor (stdio)
npm start
```

---

## 🔌 Integração

### IBM Bob (Roo-Cline)
Adicione ao arquivo `.bob/mcp.json` do workspace:

```json
{
  "mcpServers": {
    "ibm-bob-lab": {
      "command": "node",
      "args": ["C:/caminho/para/ibm-bob-lab-/mcp/dist/index.js"]
    }
  }
}
```

### Claude Desktop
Adicione ao `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "ibm-bob-lab": {
      "command": "node",
      "args": ["/caminho/para/ibm-bob-lab-/mcp/dist/index.js"]
    }
  }
}
```

Consulte o arquivo `EXEMPLO_CONFIGURACAO.md` para mais detalhes.

---

## 🌐 Modo HTTP (Acesso Remoto)

Para expor o servidor via API/HTTPS para acesso externo:

```bash
MCP_TRANSPORT=http PORT=3100 node dist/index.js
```

O servidor ficará acessível em `http://localhost:3100`.

---

## 🛠️ Scripts Disponíveis

| Script | Comando | Descrição |
|---|---|---|
| Build | `npm run build` | Compila TypeScript → JavaScript |
| Start | `npm start` | Inicia em modo stdio |
| HTTP | `npm run start:http` | Inicia em modo HTTP na porta 3100 |
| Dev | `npm run dev` | Executa direto com ts-node |

---

## 📋 Requisitos

- Node.js >= 18
- npm >= 9
- TypeScript >= 5.4

---

## 📄 Licença

MIT — Digital Innovation One / IBM Bob Lab

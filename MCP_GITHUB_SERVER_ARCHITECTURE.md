# 🐙 MCP GitHub Server — Arquitetura

> Documentação técnica da arquitetura do servidor MCP para operações Git

---

## 🎯 Visão Geral

O **MCP GitHub Server** é um servidor MCP (Model Context Protocol) que permite ao IBM Bob
executar operações Git diretamente no repositório configurado, através de ferramentas
naturalmente integradas ao chat.

---

## 🏗️ Arquitetura

```
mcp-github/
├── src/
│   └── index.ts          ← Servidor MCP principal (8 ferramentas)
├── build/
│   └── index.js          ← Build compilado (gerado pelo tsc)
├── package.json          ← Dependências: @modelcontextprotocol/sdk, zod
├── tsconfig.json         ← Configuração TypeScript (ES2022, Node16)
└── README.md             ← Documentação de uso
```

---

## 🔄 Fluxo de Comunicação

```
IBM Bob (Chat)
      │
      │ protocolo MCP (stdio)
      ▼
MCP GitHub Server (Node.js)
      │
      │ executa comandos Git via child_process
      ▼
Repositório Git Local
      │
      │ git push / pull
      ▼
GitHub (origin/main)
```

---

## 🛠️ Ferramentas Registradas

### `git_status`
- **Descrição:** Mostra o status atual do repositório
- **Input:** nenhum
- **Output:** saída do `git status`

### `git_add`
- **Descrição:** Adiciona arquivos ao staging area
- **Input:** `arquivos: string` — ex: `"."` ou `"src/index.ts"`
- **Output:** confirmação dos arquivos adicionados

### `git_commit`
- **Descrição:** Cria um commit com mensagem
- **Input:** `mensagem: string` — ex: `"feat: nova funcionalidade"`
- **Output:** hash e detalhes do commit criado

### `git_push`
- **Descrição:** Envia commits para o repositório remoto
- **Input:** `remote: string` (padrão: `"origin"`), `branch: string` (padrão: `"main"`)
- **Output:** confirmação do push realizado

### `git_pull`
- **Descrição:** Busca e integra mudanças do remoto
- **Input:** `remote: string` (padrão: `"origin"`), `branch: string` (padrão: `"main"`)
- **Output:** resultado do pull com arquivos atualizados

### `git_log`
- **Descrição:** Exibe histórico de commits
- **Input:** `limite: number` (padrão: `10`)
- **Output:** lista de commits em formato `--oneline --decorate --graph`

### `git_branch`
- **Descrição:** Lista ou cria branches
- **Input:** `nova_branch?: string` — opcional
- **Output:** lista de branches ou confirmação de criação

### `git_diff`
- **Descrição:** Mostra diferenças entre arquivos
- **Input:** `staged: boolean` (padrão: `false`)
- **Output:** diff completo dos arquivos modificados ou staged

---

## ⚙️ Variáveis de Ambiente

| Variável | Descrição | Padrão |
|---|---|---|
| `GIT_REPO_DIR` | Caminho absoluto para o repositório Git | `process.cwd()` |

---

## 🚀 Instalação

```bash
# 1. Instalar dependências
cd mcp-github
npm install

# 2. Compilar TypeScript
npm run build

# 3. Verificar o build
ls build/index.js
```

---

## ⚙️ Configuração no IBM Bob

Adicione ao `.bob/mcp.json` do projeto:

```json
{
  "mcpServers": {
    "mcp-github": {
      "command": "node",
      "args": ["C:/Users/Alex/.bob/playground/ibm-bob-lab-/mcp-github/build/index.js"],
      "env": {
        "GIT_REPO_DIR": "C:/Users/Alex/.bob/playground/ibm-bob-lab-"
      }
    }
  }
}
```

---

## 💬 Exemplos de Uso no Chat

```
Qual é o status do repositório?
→ Usa: git_status

Adicione todos os arquivos ao staging
→ Usa: git_add { arquivos: "." }

Faça um commit com a mensagem "feat: nova feature"
→ Usa: git_commit { mensagem: "feat: nova feature" }

Envie para o repositório remoto
→ Usa: git_push { remote: "origin", branch: "main" }

Mostre os últimos 5 commits
→ Usa: git_log { limite: 5 }

Crie uma nova branch chamada feature/login
→ Usa: git_branch { nova_branch: "feature/login" }
```

---

## 🔒 Segurança

- O servidor executa apenas comandos Git nativos via `child_process`
- Nenhuma credencial é armazenada no código — usa as credenciais configuradas no sistema (`git credential.helper`)
- O diretório do repositório é controlado via variável de ambiente `GIT_REPO_DIR`
- Erros são retornados com `isError: true` para que o Bob possa se auto-corrigir

---

## 🧰 Stack Técnica

| Tecnologia | Versão | Uso |
|---|---|---|
| TypeScript | ^5.5.0 | Linguagem principal |
| `@modelcontextprotocol/sdk` | ^1.0.0 | Framework MCP |
| `zod` | ^3.23.8 | Validação de schemas |
| Node.js | ≥18 | Runtime |

---

*MCP GitHub Server Architecture — IBM Bob Lab*
*Bootcamp IBM Bob + Appwrite — Digital Innovation One*

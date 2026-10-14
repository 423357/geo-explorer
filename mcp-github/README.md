# 🐙 MCP GitHub Server

Servidor MCP para operações Git integrado ao IBM Bob.
Permite ao Bob executar comandos Git diretamente no repositório configurado.

---

## 🛠️ Ferramentas Disponíveis

| Ferramenta | Descrição |
|---|---|
| `git_status` | Mostra o status atual do repositório |
| `git_add` | Adiciona arquivos ao staging area |
| `git_commit` | Cria um commit com mensagem |
| `git_push` | Envia commits para o repositório remoto |
| `git_pull` | Busca e integra mudanças do remoto |
| `git_log` | Exibe histórico de commits |
| `git_branch` | Lista ou cria branches |
| `git_diff` | Mostra diferenças entre arquivos |

---

## 🚀 Instalação e Build

```bash
cd ibm-bob-lab-/mcp-github
npm install
npm run build
```

---

## ⚙️ Configuração no IBM Bob

Adicione ao arquivo `.bob/mcp.json` do projeto:

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

> **GIT_REPO_DIR** — caminho absoluto para o repositório Git que o servidor vai operar.
> Se omitido, usa o diretório onde o processo foi iniciado.

---

## 💬 Exemplos de Uso no Chat do Bob

```
Qual é o status do repositório?
Adicione todos os arquivos ao staging
Faça um commit com a mensagem "feat: nova funcionalidade"
Faça push para origin main
Mostre os últimos 5 commits
Liste as branches disponíveis
Crie uma nova branch chamada feature/login
Mostre o diff dos arquivos staged
```

---

## 📁 Estrutura

```
mcp-github/
├── src/
│   └── index.ts      # Código-fonte — 8 ferramentas Git
├── build/
│   └── index.js      # Build compilado (gerado pelo tsc)
├── package.json
├── tsconfig.json
└── README.md
```

---

*MCP GitHub Server — IBM Bob Lab | Bootcamp IBM Bob + Appwrite*

# 📦 Guia de Instalação — IBM Bob Lab MCP Server

> Guia passo a passo para instalar, configurar e conectar o servidor MCP ao IBM Bob ou Claude Desktop.

---

## ✅ Pré-requisitos

Antes de começar, verifique se você tem instalado:

```bash
# Verificar Node.js (precisa ser >= 18)
node --version

# Verificar npm
npm --version
```

Se não tiver o Node.js, baixe em: https://nodejs.org

---

## 🗂️ Passo 1 — Clonar / Localizar o Projeto

Se você clonou o repositório completo, o servidor MCP está em:

```
ibm-bob-lab-/mcp/
```

Acesse a pasta:

```bash
cd ibm-bob-lab-/mcp
```

---

## 📥 Passo 2 — Instalar Dependências

```bash
npm install
```

Isso instalará:
- `@modelcontextprotocol/sdk` — SDK oficial do protocolo MCP
- `zod` — validação de schemas TypeScript
- `typescript` — compilador TypeScript (devDependency)

---

## 🔨 Passo 3 — Compilar o Projeto

```bash
npm run build
```

O comando compila os arquivos `src/*.ts` para `dist/*.js`.  
Após a compilação, a pasta `dist/` conterá:

```
dist/
├── index.js      # Ponto de entrada do servidor
├── tools.js      # Ferramentas MCP
├── services.js   # Lógica de negócio
└── types.js      # Tipos compilados
```

---

## 🧪 Passo 4 — Testar o Servidor

Execute manualmente para confirmar que inicia sem erros:

```bash
node dist/index.js
```

Você verá no stderr:
```
[ibm-bob-lab] MCP Server stdio iniciado — aguardando conexão do agente
```

Pressione `Ctrl+C` para parar.

---

## 🔌 Passo 5 — Conectar ao IBM Bob

### Opção A: Escopo de Workspace (recomendado)

Edite ou crie o arquivo `.bob/mcp.json` na raiz do seu workspace:

```json
{
  "mcpServers": {
    "ibm-bob-lab": {
      "command": "node",
      "args": ["C:/Users/SeuUsuario/.bob/playground/ibm-bob-lab-/mcp/dist/index.js"]
    }
  }
}
```

> ⚠️ Use o caminho absoluto para o arquivo `dist/index.js`.

### Opção B: Escopo Global

Edite `~/.bob/settings/mcp.json` para disponibilizar em todos os workspaces.

---

## 🔄 Passo 6 — Recarregar o IBM Bob

Após salvar o `mcp.json`, o IBM Bob recarrega automaticamente o servidor.  
Verifique no painel MCP se `ibm-bob-lab` aparece como **conectado** ✅.

---

## 🌐 Modo HTTP (Opcional)

Para expor o servidor via API para acesso remoto:

### Windows (PowerShell)
```powershell
$env:MCP_TRANSPORT="http"; $env:PORT="3100"; node dist/index.js
```

### Linux / macOS
```bash
MCP_TRANSPORT=http PORT=3100 node dist/index.js
```

O servidor ficará disponível em `http://localhost:3100`.

---

## ❗ Solução de Problemas

| Problema | Solução |
|---|---|
| `Cannot find module` | Execute `npm install` e `npm run build` novamente |
| Servidor não aparece no Bob | Verifique se o caminho no `mcp.json` é absoluto e correto |
| Erro de permissão no arquivo | Execute `chmod 755 dist/index.js` (Linux/macOS) |
| `tsc: command not found` | Use `node node_modules/typescript/bin/tsc` |
| Porta 3100 em uso | Mude com `PORT=3200 MCP_TRANSPORT=http node dist/index.js` |

---

## 📞 Suporte

- Documentação do MCP: https://modelcontextprotocol.io
- IBM Bob: https://ibm.com/bob
- DIO: https://dio.me

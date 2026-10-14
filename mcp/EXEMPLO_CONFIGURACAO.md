# ⚙️ Exemplos de Configuração — IBM Bob Lab MCP Server

> Exemplos práticos de como configurar e usar o servidor MCP em diferentes cenários.

---

## 📁 Configuração Básica (IBM Bob — Workspace)

Arquivo: `.bob/mcp.json` na raiz do workspace

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

## 📁 Configuração Global (IBM Bob — Todos os Workspaces)

Arquivo: `~/.bob/settings/mcp.json`

```json
{
  "mcpServers": {
    "ibm-bob-lab": {
      "command": "node",
      "args": ["C:/Users/Alex/.bob/playground/ibm-bob-lab-/mcp/dist/index.js"],
      "alwaysAllow": ["listar_tecnologias", "buscar_trilha"]
    }
  }
}
```

> `alwaysAllow` aprova automaticamente as ferramentas de leitura (sem confirmação manual).

---

## 🖥️ Configuração Claude Desktop

Arquivo: `%APPDATA%\Claude\claude_desktop_config.json` (Windows)  
Arquivo: `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS)

```json
{
  "mcpServers": {
    "ibm-bob-lab": {
      "command": "node",
      "args": ["/Users/alex/projetos/ibm-bob-lab-/mcp/dist/index.js"]
    }
  }
}
```

---

## 🌐 Configuração HTTP Remota

Para acessar o servidor via HTTPS/SSO de outra máquina:

### Servidor (máquina que hospeda)
```bash
MCP_TRANSPORT=http PORT=3100 node dist/index.js
```

### Cliente (IBM Bob apontando para o servidor remoto)
```json
{
  "mcpServers": {
    "ibm-bob-lab-remoto": {
      "url": "http://192.168.1.100:3100"
    }
  }
}
```

---

## 💬 Exemplos de Prompts para o IBM Bob

Depois de conectado, use estes prompts no chat do IBM Bob:

### Listar todas as trilhas
```
Liste todas as trilhas de aprendizado disponíveis
```

### Buscar trilha específica
```
Me mostre a trilha completa de Python com todos os módulos e XP
```
```
Quero ver a trilha de Java com os badges disponíveis
```

### Gerar desafio de código
```
Gera um desafio básico de Java para eu praticar
```
```
Cria um desafio avançado de Python com exemplos de entrada e saída
```
```
Preciso de um desafio intermediário de TypeScript
```

### Gerar certificado
```
Gera um certificado para o aluno "João Silva" que concluiu a trilha de React
```
```
Emite um certificado de conclusão para "Maria Oliveira" na trilha de Python
```

### Listar tecnologias
```
Quais tecnologias estão disponíveis no servidor MCP?
```

---

## 🔑 Configuração com Variáveis de Ambiente

Se o servidor precisar de chaves de API no futuro:

```json
{
  "mcpServers": {
    "ibm-bob-lab": {
      "command": "node",
      "args": ["C:/caminho/mcp/dist/index.js"],
      "env": {
        "DIO_API_KEY": "${env:DIO_API_KEY}",
        "MCP_TRANSPORT": "stdio"
      }
    }
  }
}
```

Configure a variável no ambiente antes de iniciar o Bob:

```powershell
# PowerShell (Windows)
$env:DIO_API_KEY = "sua-chave-aqui"
```

```bash
# Bash (Linux/macOS)
export DIO_API_KEY="sua-chave-aqui"
```

---

## 🔒 Restringir a Modos Específicos do Bob

Para disponibilizar as ferramentas apenas no modo `agent`:

```json
{
  "mcpServers": {
    "ibm-bob-lab": {
      "command": "node",
      "args": ["C:/caminho/mcp/dist/index.js"],
      "groups": ["agent"]
    }
  }
}
```

---

## 🚫 Desabilitar Ferramentas Específicas

Para ocultar ferramentas que não quer expor:

```json
{
  "mcpServers": {
    "ibm-bob-lab": {
      "command": "node",
      "args": ["C:/caminho/mcp/dist/index.js"],
      "disabledTools": ["gerar_certificado"]
    }
  }
}
```

---

## ✅ Verificando a Conexão

Após configurar, peça ao Bob:

```
Use a ferramenta listar_tecnologias do ibm-bob-lab
```

Se retornar a lista de tecnologias, o servidor está funcionando corretamente. ✅

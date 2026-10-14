# 🗺️ Índice Visual do Projeto - Formação IBM com Bob (DIO)

> Guia visual rápido para navegação no projeto

---

## 📚 Documentação Principal

| Documento | Descrição | Link |
|---|---|---|
| 📚 Documentação Completa | Guia técnico completo do projeto | [DOCUMENTACAO_COMPLETA_PROJETO.md](DOCUMENTACAO_COMPLETA_PROJETO.md) |
| ⭐ README Principal | Visão geral e início rápido | [README.md](README.md) |
| ⚡ Comandos Slash | Guia rápido dos comandos | [COMANDOS_SLASH.md](COMANDOS_SLASH.md) |
| 🐙 Arquitetura GitHub | Arquitetura do MCP Server GitHub | [MCP_GITHUB_SERVER_ARCHITECTURE.md](MCP_GITHUB_SERVER_ARCHITECTURE.md) |

---

## 🏗️ Estrutura Visual do Projeto

```
projeto_final_dio_formacao_bob/
│
├── .bob/                              ← Configurações do Bob
│   ├── slash-commands.json            ← Registro de comandos
│   ├── SLASH_COMMANDS_README.md       ← Documentação completa
│   └── test-slash-commands.ts         ← Testes
│
├── dio-explore/                       ← PROJETO DIO EXPLORER
│   ├── commands/                      ← ★ COMANDOS PRINCIPAIS
│   │   ├── trilha.ts                  ← /trilha
│   │   ├── desafio.ts                 ← /desafio
│   │   └── certificado.ts             ← /certificado
│   │
│   ├── data/
│   │   └── trilhas_dio.json           ← 🗂️ BASE DE DADOS — 32 trilhas
│   │
│   ├── mcp/
│   │   ├── src/                       ← 🤖 MCP SERVER — Código fonte
│   │   ├── README.md                  ← Documentação
│   │   └── GUIA_INSTALACAO.md         ← Instalação
│   │
│   ├── tests/                         ← ✅ TESTES (101 testes)
│   │   ├── trilha.test.ts
│   │   ├── desafio.test.ts
│   │   └── certificado.test.ts
│   │
│   ├── README.md                      ← Documentação DIO Explorer
│   ├── EXEMPLOS.md                    ← Exemplos práticos
│   └── RELATORIO_FINAL_TESTES.txt     ← Relatório de testes
│
├── src/                               ← Código-fonte principal
├── README.md                          ← ★ COMECE AQUI
├── COMANDOS_SLASH.md                  ← Guia rápido
└── DOCUMENTACAO_COMPLETA_PROJETO.md   ← Documentação técnica
```

---

## 🎯 Por Onde Começar?

### 👨‍💻 Sou Desenvolvedor Iniciante

1. Leia: `README.md`
2. Teste: `/trilha Python`
3. Pratique: `/desafio Python Básico`
4. Explore: `dio-explore/EXEMPLOS.md`

### 🚀 Sou Desenvolvedor Experiente

1. Leia: `DOCUMENTACAO_COMPLETA_PROJETO.md`
2. Explore: `dio-explore/commands/`
3. Analise: `dio-explore/tests/`
4. Contribua: Adicione novas funcionalidades

### 🤖 Quero Aprender sobre MCP

1. Configure: `mcp-github/README.md`
2. Explore: `mcp-github/src/`
3. Teste: Use as ferramentas MCP no Bob

---

## ⚡ Comandos Disponíveis

### Comando `/trilha`
```
/trilha Python
```
**Retorna:**
- 🗂️ Informações da trilha
- 🏆 Badges disponíveis
- 📺 Lives ao vivo
- 📋 Plano de estudos em 3 fases

---

### Comando `/desafio`
```
/desafio JavaScript Intermediário
```
**Retorna:**
- 📋 Descrição do desafio
- ✅ Requisitos técnicos
- 💡 Dicas de implementação
- 🏆 250 XP de recompensa

---

### Comando `/certificado`
```
/certificado "Ana Silva" React
```
**Retorna:**
- 📜 Certificado de conclusão
- 🔐 Código único de validação
- 🔗 Link de verificação

---

## 🗂️ Tecnologias Disponíveis

### Linguagens (11)
```
Java • Python • TypeScript • JavaScript • Go • Rust • C# • PHP • Swift • Kotlin • R
```

### Frontend (6)
```
React • Vue.js • Angular • Next.js • Flutter • UX/UI Design
```

### Backend & Cloud (6)
```
Node.js • AWS • Azure • DevOps • Docker • Kubernetes
```

### Especialidades (7)
```
Data Science • Machine Learning • Blockchain
Cybersecurity • QA • UX/UI Design • Product Manager
```

---

## 📋 Guias Específicos

### Para Usuários

| Guia | Descrição | Link |
|---|---|---|
| 🚀 Início Rápido | Como usar os comandos | [COMANDOS_SLASH.md](COMANDOS_SLASH.md) |
| 🎮 Exemplos | Exemplos práticos de uso | [dio-explore/EXEMPLOS.md](dio-explore/EXEMPLOS.md) |
| ❓ FAQ | Perguntas frequentes | [README.md](README.md) |

### Para Desenvolvedores

| Guia | Descrição | Link |
|---|---|---|
| 📚 Docs Completa | Guia técnico do projeto | [DOCUMENTACAO_COMPLETA_PROJETO.md](DOCUMENTACAO_COMPLETA_PROJETO.md) |
| 🐙 MCP GitHub | Arquitetura do servidor | [MCP_GITHUB_SERVER_ARCHITECTURE.md](MCP_GITHUB_SERVER_ARCHITECTURE.md) |
| 🤖 MCP DIO | Guia de instalação | [dio-explore/mcp/GUIA_INSTALACAO.md](dio-explore/mcp/GUIA_INSTALACAO.md) |

---

## 🧪 Status dos Testes

```
✅ 81 testes passando
📊 99% de cobertura
🎯 Meta de 70% superada
```

---

*Índice Visual — Projeto Final Formação IBM com Bob (DIO)*
*345 linhas · 10.1 KB*

# Arquitetura do Servidor MCP GitHub

## Visão Geral

Este projeto implementa um servidor MCP (Model Context Protocol) integrado ao IBM Bob para explorar trilhas de aprendizado da DIO.

## Estrutura

```
ibm-bob-lab-/
├── src/                        # Código-fonte TypeScript
│   ├── index.ts                # Ponto de entrada
│   ├── server.ts               # Configuração do servidor MCP
│   ├── config/
│   │   └── config.ts           # Configurações gerais
│   ├── services/
│   │   ├── credential-helper.ts
│   │   ├── git-executor.ts
│   │   └── repository-manager.ts
│   ├── tools/
│   │   ├── branch.ts
│   │   ├── checkout.ts
│   │   ├── clone.ts
│   │   ├── commit.ts
│   │   ├── index.ts
│   │   ├── pull.ts
│   │   ├── push.ts
│   │   └── status.ts
│   ├── types/
│   │   └── index.ts
│   └── utils/
│       ├── error-handler.ts
│       ├── logger.ts
│       └── validator.ts
├── dist/                       # Arquivos compilados (JavaScript)
├── config/                     # Configurações de ambiente
├── docs/                       # Documentação
└── tests/                      # Testes
    ├── fixtures/
    └── integration/
```

## Fluxo de Execução

1. O IBM Bob recebe um comando slash
2. O servidor MCP processa a requisição
3. A ferramenta correspondente é acionada
4. O resultado é retornado ao usuário no chat

## Tecnologias

- **TypeScript** — linguagem principal
- **IBM Bob MCP SDK** — integração com o Bob
- **Node.js** — runtime

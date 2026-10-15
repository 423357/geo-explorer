# 🧭 Geo-Explorer

Projeto educacional desenvolvido a partir das aulas de IBM Bob da DIO,
adaptado para explorar trilhas de aprendizagem pelo terminal e por um
servidor MCP.

A aplicação permite consultar planos de estudos, gerar desafios de código
e criar certificados fictícios. O catálogo ativo contém trilhas de Java,
TypeScript e Python, armazenadas em um arquivo JSON.

O funcionamento local não exige créditos de IA. O IBM Bob foi utilizado
nas aulas como apoio ao desenvolvimento; os comandos consultam dados
locais e também podem ser acessados por clientes compatíveis com MCP.

Os certificados são simulações educacionais, sem validade acadêmica ou
profissional e sem emissão ou validação pela DIO.

---

## 🚀 Instalação e primeira execução

Requisitos: Node.js 22 ou superior e npm. O projeto foi testado no Windows
com Node.js 24.14.1 e npm 11.11.0.

Abra um terminal na pasta principal do projeto, onde está o `package.json`.

### Instalar as dependências

```powershell
npm.cmd ci
npm.cmd --prefix .\mcp ci
```

O comando `npm ci` instala as versões registradas nos arquivos
`package-lock.json`. Essa instalação é necessária na primeira preparação
do projeto ou após mudanças nas dependências.

### Compilar e consultar uma trilha

```powershell
npm.cmd run build
node dist/index.js trilha python
```

A consulta deve retornar a trilha Python AI Developer, com 70 horas.

Após alterar o código TypeScript ou os dados JSON, compile novamente.

### Executar os testes

```powershell
npm.cmd run build
npm.cmd test -- --runInBand
```

Para compilar e verificar as ferramentas MCP por stdio:

```powershell
npm.cmd --prefix .\mcp run test:smoke
```

Esse último comando compila os dois pacotes, inicia um cliente MCP de teste,
verifica as ferramentas e encerra a conexão automaticamente.

Os exemplos acima usam PowerShell no Windows. Em outros sistemas,
use `npm` no lugar de `npm.cmd` e `./mcp` no lugar de `.\mcp`.

---

## 🎮 Como usar os comandos

Execute os exemplos na pasta principal, após compilar o projeto.

### Consultar uma trilha

```powershell
node dist/index.js trilha java
node dist/index.js trilha python
node dist/index.js trilha typescript
```

Sem informar a tecnologia, o comando lista as trilhas cadastradas:

```powershell
node dist/index.js trilha
```

### Gerar um desafio

```powershell
node dist/index.js desafio java basico
node dist/index.js desafio java intermediario
node dist/index.js desafio java avancado
```

Nesta versão, os desafios cadastrados são de Java, nos três níveis.
Python e TypeScript possuem trilhas, mas ainda não possuem desafios.

Os níveis são escritos sem acentos: `basico`, `intermediario` e `avancado`.

### Gerar um certificado fictício

```powershell
node dist/index.js certificado "Ana Silva" java
node dist/index.js certificado "Pessoa Exemplo" python
```

As aspas mantêm o nome completo como um único argumento.
Somente trilhas cadastradas podem receber certificados fictícios.
O programa não verifica conclusão real de cursos.

### Arquivos e respostas

Desafios e certificados são gravados em `dist/`, com o caminho informado
no campo `arquivo` da resposta JSON.

O código de saída é `0` para sucesso e `1` para falhas, como argumentos
obrigatórios ausentes, tecnologia inválida ou comando desconhecido.

No PowerShell, consulte o código imediatamente após a execução:

```powershell
$LASTEXITCODE
```

Os prompts em `.bob/commands/` foram preservados como material das aulas.
Os exemplos desta seção usam a interface de terminal implementada no projeto.

---

## 🗂️ Organização do projeto

```text
src/
  data/trilhas.json           # Base ativa: Java, TypeScript e Python
  index.ts                    # Interface de comandos pelo terminal
  services/                   # Consulta e geração dos documentos
  tools/commands.ts           # Validação e respostas dos comandos
  types/                      # Tipos TypeScript
  utils/                      # Funções auxiliares

tests/
  cli.test.ts                 # Executa a CLI e verifica suas respostas
  integration/                # Testes do fluxo completo
  *.test.ts                   # Testes dos serviços e comandos

mcp/
  src/index.ts                # Servidor e registro das ferramentas MCP
  src/tools.ts                # Adaptação para os comandos compartilhados
  smoke.mjs                   # Cliente de teste MCP por stdio
  package.json                # Comandos e dependências do servidor

dist/                         # Código compilado e documentos gerados
coverage/                     # Relatórios dos testes
.bob/commands/                # Prompts preservados das aulas
dio-explore/                  # Materiais e dados anteriores das aulas
docs/                         # Documentação complementar
```

O programa principal e o MCP usam a base `src/data/trilhas.json`
e as regras de `src/tools/commands.ts`.

O MCP importa os comandos compilados da pasta principal `dist/`.
Seu atalho de compilação prepara primeiro o projeto principal e depois
o servidor.

Os arquivos `mcp/src/services.ts` e `mcp/src/types.ts` foram preservados
da implementação anterior; as ferramentas atuais não usam essa lógica.

A pasta `mcp-github/` contém um servidor complementar para operações Git,
preservado das aulas. Ele não é necessário para executar o Geo-Explorer.

---

## 📊 Testes e validação

A última execução completa do Jest passou com:

| Verificação | Resultado |
| --- | --- |
| Conjuntos de testes | 7 aprovados |
| Testes automatizados | 86 aprovados |
| Cobertura de linhas do código incluído no relatório | Aproximadamente 99% |

Para repetir, compile antes de executar os testes:

```powershell
npm.cmd run build
npm.cmd test -- --runInBand
```

Os testes da CLI executam `dist/index.js`, por isso dependem da compilação
atualizada. A cobertura do Jest não inclui a execução desses processos
separados nem representa uma medição do servidor MCP.

### Verificação MCP por stdio

```powershell
npm.cmd --prefix .\mcp run test:smoke
```

O smoke verifica seis etapas:

1. Conexão e listagem das quatro ferramentas.
2. Consulta da trilha Java.
3. Recusa de certificado para trilha inexistente.
4. Listagem das três tecnologias da base JSON.
5. Geração e leitura do arquivo de desafio.
6. Geração e leitura do certificado fictício.

Os arquivos desse teste ficam em uma pasta temporária, removida ao final.
O cliente também encerra a conexão com o servidor.

O smoke é uma verificação separada e não entra na contagem dos 86 testes
do Jest. O transporte HTTP ainda não foi validado nesta versão.

---

## 🔌 Integração com clientes MCP

O servidor permite que um cliente compatível chame as ferramentas do
Geo-Explorer. A integração foi verificada pelo cliente local de teste
`mcp/smoke.mjs`, sem necessidade de créditos de IA.

Depois de instalar as dependências, compile:

```powershell
npm.cmd --prefix .\mcp run build
```

No cliente MCP, configure uma entrada semelhante a esta, ajustando o
caminho absoluto para sua máquina:

```json
{
  "mcpServers": {
    "geo-explorer": {
      "command": "node",
      "args": ["C:/caminho/geo-explorer/mcp/dist/index.js"]
    }
  }
}
```

Esse JSON é um exemplo de configuração do cliente, não um comando
para executar no terminal. O local e o formato da configuração dependem
do cliente utilizado.

O cliente inicia o servidor e troca mensagens pelo transporte `stdio`.
Executar o servidor manualmente apenas o deixa aguardando essas mensagens;
ele não recebe perguntas em linguagem natural diretamente no terminal.

Para uma verificação independente de agente de IA, use:

```powershell
npm.cmd --prefix .\mcp run test:smoke
```

### Ferramentas disponíveis

| Ferramenta | Argumentos | Resultado |
| --- | --- | --- |
| `buscar_trilha` | `tecnologia` opcional | Consulta uma trilha ou lista todas |
| `gerar_desafio` | `tecnologia`, `nivel`, `outputDir` opcional | Gera um desafio em Markdown |
| `gerar_certificado` | `alunoNome`, `trilhaNome`, `outputDir` opcional | Gera um certificado fictício |
| `listar_tecnologias` | Nenhum | Lista Java, TypeScript e Python |

No MCP, o nível do desafio deve ser `Basico`, `Intermediario` ou `Avancado`.
O adaptador converte esse valor para o formato usado pelos comandos principais.

Para gerar arquivos por um cliente MCP, prefira informar `outputDir` com
um caminho absoluto. Sem esse argumento, a pasta `dist` é relativa ao
diretório de trabalho do processo iniciado pelo cliente.

O modo HTTP permanece no código herdado das aulas, mas não foi validado
nesta versão. O fluxo documentado e testado utiliza `stdio`.

---

## 📁 Base de trilhas

A base ativa fica em [`src/data/trilhas.json`](src/data/trilhas.json).
Ela é usada pelos comandos do terminal e pelas ferramentas MCP.

| Tecnologia | Nível da trilha | Duração | Módulos |
| --- | --- | --- | --- |
| Java | Iniciante | 80 horas | 6 |
| TypeScript | Intermediário | 60 horas | 4 |
| Python | Intermediário | 70 horas | 4 |

Cada trilha possui:

- `id`: identificador da trilha.
- `tecnologia`: nome usado na consulta.
- `titulo`: nome apresentado à pessoa usuária.
- `nivel`: dificuldade da trilha.
- `duracaoHoras`: duração total.
- `modulos`: etapas de estudo, com título, descrição, duração e ordem.

As trilhas são fictícias e destinadas ao exercício educacional.

### Como alterar a base

Edite `src/data/trilhas.json`, preserve a estrutura dos campos e confira
se a soma das horas dos módulos corresponde à duração total da trilha.

Depois compile e execute os testes:

```powershell
npm.cmd run build
npm.cmd test -- --runInBand
```

Os desafios continuam definidos em `src/services/desafio.service.ts`.
Nesta versão, há três desafios de Java: básico, intermediário e avançado.
Acrescentar uma trilha ao JSON não cria desafios automaticamente.

### Material anterior das aulas

O arquivo com 30 trilhas em `dio-explore/` foi preservado como referência.
Ele não é a base consultada pelos comandos desta versão.

---

## 📋 Tecnologias utilizadas

- **TypeScript 5:** código principal e servidor MCP.
- **Node.js:** execução dos comandos e geração de arquivos.
- **JSON:** armazenamento da base ativa de trilhas.
- **Jest e ts-jest:** testes unitários, de integração e da CLI.
- **MCP SDK:** comunicação entre o servidor e clientes MCP.
- **Zod:** definição e validação dos argumentos das ferramentas.
- **Markdown:** desafios, certificados e documentação.
- **Git:** histórico das alterações feitas durante o desenvolvimento.
- **VS Code:** edição, terminal e revisão dos arquivos.

## ✨ Melhorias realizadas

O projeto partiu do material das aulas de IBM Bob e recebeu estas adaptações:

- Interface de terminal para escolher trilha, desafio ou certificado.
- Validação de argumentos obrigatórios e códigos de saída para sucesso e falha.
- Separação das trilhas em um arquivo JSON.
- Recusa de certificados para trilhas não cadastradas.
- Certificados explicitamente fictícios, sem link de validação oficial da DIO.
- Reutilização das mesmas regras pela CLI e pelo MCP.
- Correção da compilação TypeScript do servidor MCP.
- Novos testes de certificados e da interface de terminal.
- Cliente de teste MCP que verifica chamadas reais e arquivos gerados.
- Documentação atualizada para o comportamento verificado nesta versão.

A evolução foi realizada com orientação de IA, revisão dos arquivos,
execução local e registro das etapas em commits.

---
## 📚 O que aprendi

Este foi meu primeiro projeto. Nas aulas, acompanhei os prompts apresentados
pelo professor e usei o IBM Bob para construir a versão inicial.

Durante a adaptação para o Geo-Explorer, pratiquei a navegação pelos arquivos
no VS Code, a execução de comandos no terminal, a alteração do código,
a compilação, os testes automatizados e o registro de mudanças com Git.

Ainda estou me familiarizando com os termos técnicos. São muitos conceitos
novos em pouco tempo, e meu objetivo é continuar praticando para compreender
melhor cada parte, sem depender apenas de repetir instruções.

O acompanhamento passo a passo com assistência de IA facilitou o processo:
pude tirar dúvidas, conferir os resultados e corrigir problemas durante
o desenvolvimento.

Gostei da experiência e quero continuar aprendendo com novos projetos.

---

## 📄 Licença
MIT — IBM Bob Lab / Digital Innovation One

---

*Bootcamp IBM Bob + Appwrite | Aula 3 — Servidor MCP, Documentação e Publicação*

# Comandos Slash — IBM Bob Lab MCP

## /trilha
Consulta trilhas de aprendizado disponíveis na DIO.

**Uso:**
```
/trilha <tecnologia>
```

**Exemplos:**
```
/trilha java
/trilha typescript
/trilha python
```

**Retorno:** Lista de módulos, duração estimada e nível de dificuldade.

---

## /desafio
Gera um arquivo de desafio de código para o aluno com base na trilha ativa.

**Uso:**
```
/desafio <nivel>
```

**Níveis:** `basico` | `intermediario` | `avancado`

**Exemplos:**
```
/desafio basico
/desafio intermediario
```

**Retorno:** Arquivo `desafio_<tecnologia>_<nivel>_<timestamp>.md` gerado em `dist/`.

---

## /certificado
Gera um certificado de conclusão para o aluno.

**Uso:**
```
/certificado <nome_aluno> <trilha>
```

**Exemplos:**
```
/certificado "Ana Silva" java
```

**Retorno:** Arquivo `certificado_<aluno>_<trilha>_<timestamp>.md` gerado em `dist/`.

---

## /status
Exibe o status atual do servidor MCP e trilhas carregadas.

**Uso:**
```
/status
```

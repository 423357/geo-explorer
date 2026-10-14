# Comando: /desafio
# Gera um desafio de código aleatório baseado no nível e tecnologia escolhidos.
# Armazenado localmente em: ibm-bob-lab-/dio-explore/COMMANDS/
# Visível no chat do IBM Bob ao digitar /desafio

---
## Instruções para o Bob

Quando o usuário digitar `/desafio <tecnologia> <nivel>`:

1. Leia o arquivo `ibm-bob-lab-/dio-explore/DATA/trilhas_dio.json`
2. Localize a trilha da tecnologia informada e identifique o nível (Iniciante / Intermediário / Avançado)
3. Gere um desafio de código criativo e coerente com o nível da trilha
4. Salve o desafio em `ibm-bob-lab-/dio-explore/DOCS/desafio_<tecnologia>_<nivel>_<timestamp>.md`

### Níveis Aceitos
- `iniciante` / `basico`
- `intermediario`
- `avancado`

### Template de Saída

```markdown
# 💻 Desafio DIO — <TECNOLOGIA> (<NIVEL>)

## 📋 Enunciado
<descrição do desafio — 3 a 5 linhas>

## ✅ Requisitos
- Requisito 1
- Requisito 2
- Requisito 3

## 💡 Dica
<dica de abordagem>

## 📥 Exemplo de Entrada
<exemplo>

## 📤 Exemplo de Saída Esperada
<exemplo>

---
*Desafio gerado pelo IBM Bob Lab — DIO*
*Data: <data atual>*
```

Exiba o desafio no chat E informe o caminho do arquivo gerado.

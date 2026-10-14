# Comando: /certificado
# Gera um certificado fictício em Markdown com o nome do aluno e trilha concluída.
# Armazenado localmente em: ibm-bob-lab-/dio-explore/COMMANDS/
# Visível no chat do IBM Bob ao digitar /certificado

---
## Instruções para o Bob

Quando o usuário digitar `/certificado <nome_aluno> <trilha>`:

1. Leia o arquivo `ibm-bob-lab-/dio-explore/DATA/trilhas_dio.json`
2. Localize a trilha e obtenha: nome, xpTotal, totalModulos, nivel
3. Gere um código de validação único (hash de 16 caracteres maiúsculos)
4. Salve o certificado em `ibm-bob-lab-/dio-explore/DOCS/certificado_<aluno>_<trilha>_<timestamp>.md`

### Template de Saída

```markdown
╔══════════════════════════════════════════════════════════════════╗
║           CERTIFICADO DE CONCLUSÃO — DIO                         ║
║           Digital Innovation One                                  ║
╚══════════════════════════════════════════════════════════════════╝

# 🏆 Certificado de Conclusão

Este documento certifica que

## <NOME DO ALUNO EM MAIÚSCULAS>

concluiu com êxito a trilha de aprendizado:

### 🎯 <NOME DA TRILHA>

**Detalhes do Certificado:**
| Campo              | Valor                        |
|--------------------|------------------------------|
| 📅 Data de Emissão | <data por extenso>           |
| 📊 Nível           | <nivel>                      |
| 📚 Módulos         | <totalModulos> módulos       |
| ⭐ XP Conquistado  | <xpTotal> XP                 |
| 🆔 Código          | `<CODIGO_VALIDACAO_16CHARS>` |

---
> 🔗 Valide em: https://www.dio.me/certificate/<CODIGO>
> 📌 Emitido pelo **IBM Bob Lab MCP**

---
*Este certificado é fictício e foi gerado para fins educacionais.*
```

Exiba o certificado no chat E informe o caminho do arquivo gerado.

Leia o arquivo `ibm-bob-lab-/dio-explore/DATA/trilhas_dio.json`, localize a trilha da tecnologia/nome `$2` e gere um certificado fictício de conclusão para o aluno chamado `$1`.

O certificado deve:
1. Conter: nome do aluno (maiúsculas), nome da trilha, data de emissão, nível, módulos, XP
2. Ter um código de validação único de 16 caracteres maiúsculos (gere baseado em: nome+trilha+timestamp)
3. Ser salvo em `ibm-bob-lab-/dio-explore/DOCS/certificado_[aluno_slug]_[trilha]_[timestamp].md`

Exiba o certificado formatado no chat:

```
╔══════════════════════════════════════════════════════════════════╗
║           CERTIFICADO DE CONCLUSÃO — DIO                         ║
╚══════════════════════════════════════════════════════════════════╝

# 🏆 Certificado de Conclusão

Este documento certifica que

## [NOME DO ALUNO EM MAIÚSCULAS]

concluiu com êxito a trilha:

### 🎯 [NOME DA TRILHA]

| Campo              | Valor                    |
|--------------------|--------------------------|
| 📅 Data de Emissão | [data por extenso]       |
| 📊 Nível           | [nivel]                  |
| 📚 Módulos         | [totalModulos] módulos   |
| ⭐ XP Conquistado  | [xpTotal] XP             |
| 🆔 Código          | `[CODIGO_16CHARS]`       |

🔗 Valide em: https://www.dio.me/certificate/[CODIGO]
📌 Emitido pelo IBM Bob Lab MCP
```

Após exibir, informe o caminho do arquivo gerado.

# Comando: /trilha
# Recebe o nome de uma tecnologia e retorna o plano de estudos completo com módulos.
# Armazenado localmente em: ibm-bob-lab-/dio-explore/COMMANDS/
# Visível no chat do IBM Bob ao digitar /trilha

---
## Instruções para o Bob

Quando o usuário digitar `/trilha <tecnologia>`:

1. Leia o arquivo `ibm-bob-lab-/dio-explore/DATA/trilhas_dio.json`
2. Localize a trilha cujo campo `tecnologia` corresponda (case-insensitive) ao argumento fornecido
3. Formate e exiba o plano de estudos conforme o template abaixo

### Template de Saída

```
🎯 PLANO DE ESTUDOS — <NOME DA TRILHA>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏷️  Tecnologia   : <tecnologia>
📊 Nível         : <nivel>
📚 Total Módulos : <totalModulos>
⭐ XP Total      : <xpTotal> XP
🛏️  Beds          : <bedsDisponiveis> vagas disponíveis
🔖 Promoção Vitalício : <Sim/Não>
📡 Lives ao Vivo : <livesAoVivo> lives
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📖 MÓDULOS:
  1. <módulo 1>
  2. <módulo 2>
  ...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔗 Acesse: https://web.dio.me/
```

Se a tecnologia não for encontrada, liste todas as disponíveis.

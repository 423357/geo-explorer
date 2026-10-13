# /trilha

Receba o nome de uma tecnologia e retorne um plano de estudos completo baseado no arquivo `dio-explore/data/trilhas_dio.json`.

## Como usar
```
/trilha <nome da tecnologia>
```

## Exemplo
```
/trilha Python
```

## Instruções

1. Leia o arquivo `dio-explore/data/trilhas_dio.json`
2. Encontre a trilha cuja `tecnologia` corresponda ao valor informado pelo usuário (ignorar maiúsculas/minúsculas)
3. Se encontrar, formate e exiba um plano de estudos com as seguintes informações:
   - Nome da trilha
   - Tecnologia
   - Nível
   - Número de módulos
   - XP total ao concluir
   - Vagas disponíveis (beds_disponiveis)
   - Promoção vitalício disponível (sim/não)
   - Número de lives ao vivo
   - Um plano de estudos sugerido dividido em módulos numerados com descrições fictícias e coerentes com a tecnologia
4. Se não encontrar a tecnologia, informe o usuário e liste as tecnologias disponíveis no arquivo

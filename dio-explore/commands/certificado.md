# /certificado

Gere um certificado de conclusão com o nome do usuário e a trilha que ele completou.

## Como usar
```
/certificado <nome do usuário> <nome da trilha>
```

## Exemplo
```
/certificado Alex Python
```

## Instruções

1. Receba o nome do usuário e a tecnologia/trilha informados
2. Leia o arquivo `dio-explore/data/trilhas_dio.json` e localize a trilha correspondente
3. Gere a data atual automaticamente
4. Formate e exiba o certificado conforme o modelo abaixo:

---

```
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║                  🎓 CERTIFICADO DE CONCLUSÃO                 ║
║                         DIO EXPLORE                          ║
║                                                              ║
║  Certificamos que                                            ║
║                                                              ║
║               [NOME DO USUÁRIO EM MAIÚSCULAS]                ║
║                                                              ║
║  concluiu com êxito a trilha:                                ║
║                                                              ║
║               [NOME COMPLETO DA TRILHA]                      ║
║                                                              ║
║  Tecnologia : [tecnologia]                                   ║
║  Nível      : [nível]                                        ║
║  Módulos    : [número de módulos]                            ║
║  XP obtido  : [xp_total]                                     ║
║                                                              ║
║  Data de conclusão: [data atual no formato DD/MM/AAAA]       ║
║                                                              ║
║  ID do Certificado: DIO-[4 letras aleatórias]-[ano atual]    ║
║                                                              ║
║            Parabéns pela sua conquista! 🚀                   ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

---

5. Salve um registro do certificado gerado na pasta `dio-explore/docs/certificados-emitidos/` com o nome do arquivo `[nome-usuario]-[tecnologia]-[data].md`
6. Parabenize o usuário e incentive-o a continuar aprendendo

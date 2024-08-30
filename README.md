## Descrição

Teste tecnico Shopper

## Inicialização

Altere as variavéis de ambiente (.env.example na raiz)

```bash
# cria a imagem docker e sobe a aplicação com todos os serviços, o DATABASE_URL já é iniciado pelo compose
$ docker:dev-build

# Caso ja tenha a imagem construida
$ docker:dev
```


## Testes

```bash

#testes unitários
$ npm run test
```

## Rotas
  - A aplicação tambem esta documentada no swagger podendo ser acessada na rota `/api`

  | Nome                          | Rota                          | File                                                                  | 
  |-------------------------------|-------------------------------|-----------------------------------------------------------------------|
  |upload de imagem para o gemini | Post `/upload`                |[documentação da rota](./docs/routes/measure/upload-measure.doc.md)|
  |Confirmação do valor da image  | Patch `/confirm`              |[documentação da rota](./docs/routes/measure/confirm-measure.doc.md)|
  |Busca as medições referente a um customer especifico  | Get `/<customer_code>/list`      |[documentação da rota](./docs/routes/measure/list-by-customer-measure.doc.md)|
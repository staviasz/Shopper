# Rota de para confirmar valor encontrado pela ia

## **PATCH** `/confirm`

### **Descrição**
Essa rota é utilizada para confirmar o valor encontrado pela ia.

### **Dados Esperados**
O corpo da requisição deve ser um JSON com os seguintes campos:

| Campo            | Tipo    | Validações                                                                                                                                                    |
|------------------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `measure_uuid`          | string  | Obrigatório. Deve estar uuid valido                                                                                          |
| `confirmed_value`  | integer  | Obrigatório.                                                                                                                         |


### **Exemplo de Requisição**
```json
{
 "measure_uuid": "string",
 "confirmed_value": integer
}
```

### Respostas

- **200 Ok**  
```json
{
  success: true
}
```

- **400 Bad Request**  
  Indica que houve um erro de validação em um ou mais campos. A resposta conterá detalhes dos erros.

  **Exemplo de Resposta:**
```json
{
 "error_code": "INVALID_DATA",
 "error_description": "descrição do erro"
}
```
- **404 Not found**
```json
{
 "error_code": "MEASURE_NOT_FOUND",
 "error_description": "Leitura do mês já realizada"
}`
```

- **409 Double Request**
```json
{
 "error_code": "DOUBLE_REPORT",
 "error_description": "Leitura do mês já realizada"
}
```

- **500 ServerError**  
  Indica que houve um erro no servidor ao processar a requisição.

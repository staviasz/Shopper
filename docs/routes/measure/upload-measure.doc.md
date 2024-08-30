# Rota de Upload de Image

## **POST** `/upload`

### **Descrição**
Essa rota é utilizada para fazer um upload de uma imagem em base64 para ser analizada por uma ia

### **Dados Esperados**
O corpo da requisição deve ser um JSON com os seguintes campos:

| Campo            | Tipo    | Validações                                                                                                                                                    |
|------------------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `image`          | string  | Obrigatório. Deve estar em base64                                                                                          |
| `customer_code`  | string  | Obrigatório.                                                                                                                         |
| `measure_datetime`| string  | Obrigatório.  |
| `measure_type`| string  | Obrigatório. Deve ser 'WATER' ou 'GAS'                                                                                                              |
|                                                                                       |

### **Exemplo de Requisição**
```json
{
 "image": "base64",
 "customer_code": "string",
 "measure_datetime": "datetime",
 "measure_type": "WATER" ou "GAS"
}
```

### Respostas

- **200 Ok**  
```json
{
 "image_url": string,
 "measure_value":integer,
 "measure_uuid": string
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

- **409 Double Request**
```json
{
 "error_code": "DOUBLE_REPORT",
 "error_description": "Leitura do mês já realizada"
}
```

- **500 ServerError**  
  Indica que houve um erro no servidor ao processar a requisição.

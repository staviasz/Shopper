# Rota de Busca de medições para determinado client

## **GET** `/<customer_code>/list`

### **Descrição**
Essa rota é utilizada para buscar as medições de determinado customer, opcionalmete pode receber o tipo de medição desejada 

### **Dados Esperados**
A requisição deve receber os seguintes campos:

| Campo            | Tipo    | Validações                                                                                                                                                    |
|------------------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `customer_code`          | string  | Obrigatório.                                                                                          |
| `measure_type`  | integer  | Opcional.                                                                                                                         |


### **Exemplo de Requisição**
```json
{base url}/<customer code>/list?measure_type=WATER
```

### Respostas

- **200 Ok**  
```json
{
 "customer_code": string,
 "measures": [
    {
      "measure_uuid": string,
      "measure_datetime": datetime,
      "measure_type": string,
      "has_confirmed":boolean,
      "image_url": string
    },
    {
      "measure_uuid": string,
      "measure_datetime": datetime,
      "measure_type": string,
      "has_confirmed":boolean,
      "image_url": string
    }
 ]
}
```

- **400 Bad Request**  
  Indica que houve um erro de validação em um ou mais campos. A resposta conterá detalhes dos erros.

  **Exemplo de Resposta:**
```json
{
 "error_code": "INVALID_TYPE",
 "error_description": "Tipo de medição não permitida"
}
```
- **404 Not found**
```json
{
 "error_code": "MEASURE_NOT_FOUND",
 "error_description": "Nenhuma leitura encontrada"
}`
```

- **500 ServerError**  
  Indica que houve um erro no servidor ao processar a requisição.

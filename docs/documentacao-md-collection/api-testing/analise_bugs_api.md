# Análise de Bugs - API Restful-Booker

## Descrição Geral
Durante a exploração exploratória e automatizada da API `Restful-Booker`, foi identificado um comportamento anômalo relacionado à validação de payload no endpoint de criação de reservas. 

## Bug Reportado: Erro 500 em Ausência de Campos Obrigatórios

**ID do Bug:** BUG-API-001
**Severidade:** Alta (Tratamento de Exceção não mapeado)
**Endpoint:** `POST /booking`

### Passo a Passo para Reproduzir
1. Realizar uma requisição POST para `https://restful-booker.herokuapp.com/booking`
2. Enviar no body JSON um payload omitindo um campo obrigatório (por exemplo, `firstname`):
   ```json
   {
       "lastname": "Brown",
       "totalprice": 111,
       "depositpaid": true,
       "bookingdates": {
           "checkin": "2026-01-01",
           "checkout": "2026-01-02"
       }
   }
   ```

### Resultado Esperado (Expectativa)
O sistema deveria identificar a ausência do campo obrigatório e retornar um HTTP Status `400 Bad Request`, juntamente com uma mensagem clara de validação (ex: `"Missing required field: firstname"`).

### Resultado Obtido (Realidade)
O servidor engasga na validação interna e retorna o status `500 Internal Server Error` com um *stack trace* ou erro genérico de servidor.

## Sugestão de Melhoria (Causa Raiz)
- **Implementar Validadores de DTO:** No back-end, deve-se utilizar anotações ou middlewares de validação no DTO (Data Transfer Object) de `Booking` para validar o schema antes da execução da regra de negócio. Se o schema for inválido, retornar `400` imediatamente. Isso protege o servidor de exceções não tratadas e economiza processamento.

## Evidência Automatizada (Nível 2)
Este comportamento foi mapeado no nosso CT08 no script Playwright (`api-restfulbooker.spec.ts`). Como engenheiros de automação, documentamos a falha realizando a asserção `expect(badResponse.status()).toBe(500);` para garantir que se a aplicação for corrigida para `400`, o teste falhe, avisando os QAs sobre a mudança de comportamento na pipeline.

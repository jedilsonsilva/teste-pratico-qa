# Cenários de Teste API (Restful-Booker)

Este documento centraliza os cenários de testes planejados para a API Restful-Booker. Eles foram automatizados primariamente usando **Playwright (`e2e/api-restfulbooker.spec.ts`)**, que agora é a fonte oficial da verdade do framework, mas as collections do Postman também estão disponíveis no repositório como backup.

## Autenticação (`/auth`)
- **CT-API-01 / CT06:** Gerar token com credenciais válidas (`admin` / `password123`).
  - **Validação Automática:** Status == 200, Token property is present.

## Consultas de Reserva (`/booking`)
- **CT-API-02 / CT09:** Buscar detalhes de uma reserva válida por ID.
  - **Validação Automática:** Status == 200, Body has first name and last name.

## Mutação de Reserva
- **CT-API-04 / CT08:** Criar nova reserva enviando payload completo e correto.
  - **Validação Automática:** Status == 200, Booking ID is returned.
- **CT-API-05 / CT09:** Atualizar reserva existente (`PUT`). Requer passagem do Token no Header (`Cookie: token=xyz`).
  - **Validação Automática:** Status == 200.
- **CT-API-06 / CT10:** Deletar reserva existente (`DELETE`). Requer passagem do Token.
  - **Validação Automática:** Status == 201 (Created/Deleted sucessfully).

---

## 🌟 Diferenciais (Nível 2) Avaliados

### 🛡️ Testes de Segurança (Security Testing)
A segurança da API foi avaliada através de cenários negativos cobrindo as camadas de autenticação e autorização:
1. **Falha de Autenticação (CT07):** Testado envio de credenciais inválidas. Validação garante que o token não é emitido e a mensagem *Bad credentials* é devolvida.
2. **Falha de Autorização (CT09):** Tentativa de modificar (PUT) um recurso protegido sem repassar o cabeçalho seguro (`Cookie: token=...`). O sistema rejeita prontamente retornando o HTTP Status Code `403 Forbidden`.

### ⚡ Testes de Performance
Como não há a exigência de usar ferramentas pesadas como JMeter ou K6 para testes de stress, a validação de performance inicial foi adicionada de forma estática dentro da automação local do Postman e levada em conta no Playwright:
- Nossos testes validam não apenas o schema, mas impõem expectativas de que os tempos de resposta para a rota pública de login ocorram em uma margem de segurança temporal baixa, garantindo um limiar aceitável de degradação.

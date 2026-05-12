# Vantagens do Modelo Feature-Actions na Automação de Testes

O modelo de **Feature-Actions com Fixtures Funcionais** é uma evolução direta do clássico Page Object Model (POM). Ele abandona o paradigma de Orientação a Objetos (Classes, Herança, Contexto `this`) em favor do paradigma Funcional, focando em simplicidade, escalabilidade e clareza.

Abaixo destaco como SDET Senior por que essa arquitetura é recomendada tanto para testes de UI quanto de API:

## 1. Eliminação de Estado Compartilhado Mútuo (`this`)
No modelo de classes tradicional, desenvolvedores tendem a salvar variáveis de estado dentro de `this` (ex: `this.bookingId`). Isso cria testes frágeis e dependentes da ordem de execução interna dos métodos da classe.
Nas *Actions* puras, qualquer estado necessário deve ser recebido por parâmetro ou retornado na função, forçando um código mais previsível e *stateless*.

## 2. Injeção de Dependências Simplificada via Fixtures
No POM tradicional, você precisava importar e instanciar manualmente cada classe:
```typescript
const loginPage = new LoginPage(page);
const checkoutPage = new CheckoutPage(page);
// Ou usar herança múltipla
```
No modelo Feature-Actions com a Fixture `app`, o framework Playwright resolve as instâncias automaticamente. O objeto central `{ app }` já contém a árvore completa instanciada e acessível via IntelliSense:
```typescript
await app.ui.login.submit();
await app.api.booking.createBooking();
```

## 3. Coesão entre Testes de UI e API
Aplicar este modelo nos testes de API padroniza a arquitetura do framework. Ao agrupar interações de API por domínio (ex: `apiAuthActions`), os testes deixam de ler como um script genérico de `post`/`get` e passam a refletir o fluxo de negócio, provendo a mesma legibilidade da UI.

## 4. Legibilidade: Clareza > DRY
A prioridade do modelo é **Legibilidade e Simplicidade**. Prefere-se ter duas funções de actions descritivas do que uma única função genérica recheada de `if/else`.
Isso minimiza a curva de aprendizado de QAs Juniores no framework, pois o código se lê como documentação:
```typescript
// Explícito e descritivo
await app.api.auth.assertSuccessfulTokenGeneration(response);
```

## 5. Escalabilidade Horizontal
Arquiteturas orientadas a herança sofrem com "Classes Deus" (God Classes) ou hierarquias complexas de `BasePage`. O padrão Feature-Actions cresce horizontalmente: se uma funcionalidade aumenta, basta exportar uma nova função construtora `createNovaFeatureActions(page)` e registrá-la na árvore da Fixture. Nenhuma classe base é tocada ou comprometida.

---

### Resumo prático de uso:
- **Como criar uma action:** Crie uma função que exporte um objeto literal contendo métodos `async`. Injete o `page` ou `request`.
- **Como registrar:** Adicione a chamada desta função construtora na Fixture `app` dentro do `use`.
- **Como usar no teste:** No callback do teste, desestruture `{ app }` e chame `app.<sua-action>.<seu-metodo>()`.

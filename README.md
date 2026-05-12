# Teste Prático QA - Automação UI & API

Este repositório contém a entrega do desafio prático de QA. 
A estratégia utilizada garante a cobertura dos requisitos obrigatórios (Nível 1) com testes estruturados e exploratórios, bem como o atingimento dos requisitos diferenciais (Nível 2) através da implementação de uma arquitetura robusta de automação utilizando **Playwright**.

## 🛠️ Ferramentas Utilizadas
- **Automação (UI e API):** Playwright + TypeScript.
- **Testes Manuais de API:** Postman (Collections incluídas no repositório).
- **Arquitetura de Testes:** Padrão Funcional **Feature-Actions com Fixtures**.

## 🏗️ Arquitetura (Feature-Actions)
O projeto utiliza um padrão arquitetural funcional moderno (`Feature-Actions`) no lugar do tradicional Page Object Model (POM).
As vantagens são: fim do estado compartilhado (`this`), injeção de dependências nativa via Fixture (`app`), e extrema legibilidade. O framework centraliza as interações dentro de `support/actions/` e expõe tudo via `support/fixtures.ts`.
> 📖 Leia mais sobre o porquê desta arquitetura no arquivo `docs/vantagens_feature_actions.md`.

## 📱 Emulação Mobile Nível 2 (Responsividade)
O projeto atinge o diferencial de responsividade configurando o **Device Emulation** nativo do Playwright (`playwright.config.ts`).
Ao invés de rodar emuladores pesados (como Appium/Android Studio), o Playwright injeta metadados no contexto do navegador Chromium, simulando instantaneamente e com exatidão o dispositivo alvo (ex: *Pixel 5*). Ele altera de forma nativa:
- **Viewport:** Trava a largura e altura da tela.
- **User-Agent:** Substitui a string de identificação do browser para mobile.
- **Touch Events:** Converte cliques em toques na tela.
- **Device Scale Factor:** Simula a densidade de pixels de um dispositivo real.
*Nota: Adicionamos um filtro de otimização (`testMatch: /.*ui-.*\.spec\.ts/`) para garantir que os testes de API não percam tempo rodando no perfil mobile, uma vez que APIs não possuem viewport.*

## 📁 Estrutura do Projeto
- `docs/`
  - `ui-testing/`: Casos de Teste (`plano_e_casos_de_teste.md`) e Relatório de Bugs (`analise_bugs_riscos.md`).
  - `api-testing/`: Documentação de cenários da API.
  - `tests/evidencias/`: Prints visuais salvos das validações manuais via automação MCP.
  - `prompts/`: Diretrizes de IA e prompts utilizados na construção (Feature-Actions, etc).
- `e2e/`: Scripts de teste automatizados do Playwright.
  - `ui-saucedemo.spec.ts`: Testes do frontend.
  - `api-restfulbooker.spec.ts`: Testes de backend.
- `support/`: Lógica central da automação.
  - `actions/`: Funções abstratas de negócio (ex: `uiLoginActions`, `apiBookingActions`).
  - `fixtures.ts`: Registro global do framework (`{ app }`).
- `RestfulBooker_*.json`: Collections e Variables de backup do Postman.

## 🚀 Como Executar a Automação

**1. Instalação de dependências:**
```bash
npm install
npx playwright install
```

**2. Execução Completa (UI + API):**
```bash
npx playwright test
```

**3. Visualizar Relatório de Testes:**
```bash
npx playwright show-report
```

## 🎥 Evidência de Execução (Vídeo)
*(Insira aqui o link do vídeo gravado/uploadado demonstrando a execução dos testes e validações).*

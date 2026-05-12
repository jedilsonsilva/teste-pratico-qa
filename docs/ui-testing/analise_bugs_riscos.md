# Análise de Bugs e Riscos (UI Testing)

## Relatório de Bugs Encontrados
*(Gerados utilizando a credencial `problem_user` no Sauce Demo para acelerar a identificação).*

| ID Bug | Descrição do Problema | Impacto | Severidade | Steps to Reproduce |
|---|---|---|---|---|
| **B01** | Imagens de produtos não carregam na vitrine | Alto | Maior | Fazer login com `problem_user`. Observar imagens na dashboard. |
| **B02** | O botão de remover ("Remove") do carrinho não funciona para todos os itens. | Médio | Menor | Adicionar itens ao carrinho. Tentar remover. |
| **B03** | Erro no fluxo de Checkout. O campo "Last Name" apaga o conteúdo, impedindo conclusão da compra. | Alto | Crítico | Adicionar produto. Clicar em Checkout. Preencher formulário e tentar enviar. |

## Riscos Identificados e Sugestões de Melhoria (Nível 2)
1. **Riscos de Usabilidade (Acessibilidade):**
   - Foi rodado o **Lighthouse** na página principal do site, que detectou baixo contraste em alguns elementos textuais. 
   - **Sugestão:** Aumentar o contraste do texto de descrição dos produtos para atender a diretrizes WCAG AAA.
2. **Riscos Funcionais (Formulário de Checkout):**
   - Ausência de validação de estrutura de CEP e e-mail.
   - **Sugestão:** Implementar máscaras e verificação de regex nos campos de dados no checkout.

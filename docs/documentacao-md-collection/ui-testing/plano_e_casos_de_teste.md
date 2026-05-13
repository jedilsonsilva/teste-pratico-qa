# Plano e Casos de Teste - QA Testing

Este documento contém os casos de teste funcionais criados com base nos requisitos do sistema **Sauce Demo** (Plataforma E-commerce UI) e **Restful-Booker** (API de Reservas de Hotel), cobrindo cenários positivos, negativos, validação de campos obrigatórios e permissões.

---

## 🛒 Parte 1: UI Testing (Sauce Demo)

### CT01 - Login com Sucesso (Caminho Feliz)

#### Objetivo
Validar que um usuário com credenciais válidas consegue acessar o inventário da loja.

#### Pré-Condições
- O usuário deve possuir cadastro válido (`standard_user`).
- A aplicação deve estar acessível na URL base.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Acessar a página `https://www.saucedemo.com/v1/` | A página de login é exibida corretamente. |
| 2  | Inserir o username `standard_user` no campo "Username" | O campo é preenchido. |
| 3  | Inserir a senha `secret_sauce` no campo "Password" | O campo é preenchido de forma oculta. |
| 4  | Clicar no botão "LOGIN" | O sistema autentica o usuário. |

#### Resultados Esperados
- O usuário é redirecionado com sucesso para a página de inventário (`/inventory.html`).
- A listagem de produtos fica visível.

#### Critérios de Aceitação
- Apenas credenciais válidas devem garantir o acesso.
- O header da página deve exibir a logo "Swag Labs".

---

### CT02 - Login com Usuário Bloqueado (Cenário Negativo)

#### Objetivo
Garantir que o sistema bloqueia o acesso e exibe mensagem de erro adequada para usuários com conta bloqueada.

#### Pré-Condições
- Usuário `locked_out_user` existe e está com status bloqueado na base.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Acessar a página de login | A página de login é carregada. |
| 2  | Preencher "Username" com `locked_out_user` | O campo recebe o valor digitado. |
| 3  | Preencher "Password" com a senha correta | O campo é preenchido. |
| 4  | Clicar no botão "LOGIN" | A ação de login é disparada, mas rejeitada pelo sistema. |

#### Resultados Esperados
- O acesso é negado e o usuário permanece na tela de login.

#### Critérios de Aceitação
- Deve exibir a mensagem de erro: `Epic sadface: Sorry, this user has been locked out.`
- O botão de "fechar" (X) na mensagem de erro deve remover a mensagem da tela.

---

### CT03 - Ordenação de Produtos pelo Preço (Crescente)

#### Objetivo
Validar se o filtro de ordenação organiza os produtos exibidos do menor para o maior preço.

#### Pré-Condições
- O usuário está autenticado.
- O usuário está na página de Inventário.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Localizar o menu dropdown de ordenação (Product Sort) no canto superior direito | O filtro atual exibe "Name (A to Z)". |
| 2  | Clicar no dropdown e selecionar a opção "Price (low to high)" | A página recarrega os itens ordenados instantaneamente. |

#### Resultados Esperados
- Os produtos são rearranjados na tela conforme a ordenação escolhida.

#### Critérios de Aceitação
- O primeiro item da lista deve ser o produto mais barato (ex: Sauce Labs Onesie - $7.99).
- O último item deve ser o produto mais caro (ex: Sauce Labs Fleece Jacket - $49.99).

---

### CT04 - Fluxo Completo de Compra (Checkout)

#### Objetivo
Validar que o usuário consegue adicionar um item ao carrinho, preencher as informações de entrega e finalizar a compra.

#### Pré-Condições
- Usuário autenticado e na página de Inventário.
- Carrinho de compras vazio.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Clicar em "ADD TO CART" no item "Sauce Labs Backpack" | O botão muda para "REMOVE" e o ícone do carrinho ganha um "1". |
| 2  | Clicar no ícone do carrinho no canto superior direito | A página "Your Cart" é carregada listando o item. |
| 3  | Clicar no botão "CHECKOUT" | A página "Checkout: Your Information" é exibida. |
| 4  | Deixar o campo "First Name" vazio e tentar continuar | Sistema acusa erro de campo obrigatório. |
| 5  | Preencher "First Name", "Last Name" e "Zip/Postal Code" com dados válidos | Campos preenchidos corretamente. |
| 6  | Clicar em "CONTINUE" | Redireciona para a página "Checkout: Overview". |
| 7  | Clicar em "FINISH" | A compra é finalizada com sucesso. |

#### Resultados Esperados
- A compra é concluída e o pedido é gerado.

#### Critérios de Aceitação
- A página final de sucesso ("Checkout: Complete!") deve exibir a mensagem "THANK YOU FOR YOUR ORDER".
- Validação visual do bloqueio caso "First Name" esteja ausente.

---

### CT05 - Remoção de Itens do Carrinho e Navegação

#### Objetivo
Validar a funcionalidade de remover produtos do carrinho e utilizar as opções de navegação e logout.

#### Pré-Condições
- O usuário tem um ou mais produtos no carrinho.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Acessar a página do carrinho | Lista de itens exibida. |
| 2  | Clicar em "REMOVE" no respectivo item | O item desaparece da lista e o contador do carrinho zera/diminui. |
| 3  | Clicar no botão "Continue Shopping" | O usuário retorna à página de Inventário. |
| 4  | Clicar no menu hambúrguer no canto superior esquerdo | O menu lateral (sidebar) expande. |
| 5  | Clicar em "Logout" | O sistema encerra a sessão. |

#### Resultados Esperados
- O usuário limpa o carrinho, navega entre as páginas sem erros e desloga.

#### Critérios de Aceitação
- O clique no Logout deve invalidar o acesso ao inventário se tentado via URL direta.

---

## 🌐 Parte 2: API Testing (Restful-Booker)

### CT06 - Autenticação Básica (Gerar Token)

#### Objetivo
Validar que a API de autenticação emite um token válido mediante envio das credenciais de administrador.

#### Pré-Condições
- A API está online.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Enviar uma requisição `POST` para o endpoint `/auth` | A requisição é processada. |
| 2  | Incluir no Body JSON o `username`: `admin` e `password`: `password123` | Os dados seguem na requisição. |

#### Resultados Esperados
- O servidor retorna os dados de autenticação.

#### Critérios de Aceitação
- Status Code retornado deve ser `200 OK`.
- O payload da resposta deve conter a propriedade `token` (ex: `{"token": "abcdef123"}`).

---

### CT07 - Autenticação com Credenciais Inválidas (Cenário Negativo)

#### Objetivo
Garantir que a API bloqueie acesso para tentativas com usuário ou senha incorretos.

#### Pré-Condições
- A API está online.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Enviar requisição `POST` para `/auth` com `username`: `admin` e senha incorreta | A requisição é enviada. |

#### Resultados Esperados
- A API nega a autenticação.

#### Critérios de Aceitação
- Status Code deve ser diferente do caminho feliz (ex: `200 OK` com payload contendo `{"reason": "Bad credentials"}` ou status de erro `401 Unauthorized` / `403 Forbidden` a depender da arquitetura exata do restful-booker).

---

### CT08 - Criar Reserva (Campos Obrigatórios)

#### Objetivo
Validar a criação de uma reserva (`Booking`) confirmando que o sistema valida e processa campos obrigatórios do body.

#### Pré-Condições
- Endpoint de criação acessível.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Enviar requisição `POST` para `/booking` enviando um payload incompleto (faltando `firstname`) | A API rejeita a criação (Status `500` ou `400`). |
| 2  | Enviar nova requisição `POST` para `/booking` com payload completo (`firstname`, `lastname`, `totalprice`, `depositpaid`, `bookingdates`) | A reserva é processada no banco de dados. |

#### Resultados Esperados
- O objeto da reserva é gerado apenas se o schema obrigatório for respeitado.

#### Critérios de Aceitação
- Status Code da criação com sucesso deve ser `200 OK`.
- A resposta deve retornar um objeto contendo o `bookingid`.

---

### CT09 - Consultar e Atualizar Reserva Existente

#### Objetivo
Validar se o fluxo completo de alteração de registro funciona (leitura e atualização) para reservas existentes, respeitando regras de acesso.

#### Pré-Condições
- Um `bookingid` válido existe na base (ex: criado no CT08).
- O testador possui um `token` válido.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Enviar requisição `GET` para `/booking/:id` (onde `:id` é a reserva existente) | Retorna as informações originais do cliente. (Status 200) |
| 2  | Enviar requisição `PUT` para `/booking/:id` enviando os dados alterados (ex: mudando `totalprice`). Não enviar Header/Cookie de Auth. | Acesso negado. (Status `403 Forbidden`). |
| 3  | Enviar a mesma requisição `PUT`, mas desta vez incluindo o header `Cookie` com valor `token=<seu_token>` | A atualização é processada. |

#### Resultados Esperados
- O sistema obriga a autenticação para mitações, mas permite a consulta pública de IDs válidos.

#### Critérios de Aceitação
- A resposta final do `PUT` (com autenticação) deve retornar Status `200 OK`.
- O payload de retorno do `PUT` deve exibir as informações recém-alteradas na reserva.

---

### CT10 - Deletar Reserva

#### Objetivo
Validar a exclusão de um registro da base de dados garantindo que o mesmo fique indisponível em futuras consultas.

#### Pré-Condições
- `bookingid` válido existe e o `token` de autenticação foi gerado.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Enviar requisição `DELETE` para `/booking/:id` passando o header `Cookie: token=<seu_token>` | O comando de exclusão é aceito. |
| 2  | Enviar requisição `GET` para `/booking/:id` tentando buscar o registro deletado | A consulta falha. |

#### Resultados Esperados
- O registro é removido com segurança.

#### Critérios de Aceitação
- A resposta do `DELETE` deve ser `201 Created` (comportamento padrão Restful-Booker) ou `200 OK`.
- O passo 2 deve obrigatoriamente retornar erro `404 Not Found`.

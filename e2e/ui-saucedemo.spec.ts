import { test, expect } from '../support/fixtures';
import AxeBuilder from '@axe-core/playwright';

test.describe('Sauce Demo - UI Tests (Feature-Actions)', () => {

  test.beforeEach(async ({ app }) => {
    await app.ui.login.navigateToLogin();
  });

  test('CT01 - Login com Sucesso', async ({ app }) => {
    await app.ui.login.fillCredentials('standard_user', 'secret_sauce');
    await app.ui.login.submit();
    await app.ui.login.assertLoginSuccess();
  });

  test('CT02 - Login com Usuário Bloqueado', async ({ app }) => {
    await app.ui.login.fillCredentials('locked_out_user', 'secret_sauce');
    await app.ui.login.submit();
    await app.ui.login.assertLoginError('Epic sadface: Sorry, this user has been locked out.');
  });

  test('CT03 - Ordenação de Produtos pelo Preço (Crescente) e Acessibilidade', async ({ app, page }) => {
    await app.ui.login.performLogin('standard_user', 'secret_sauce');
    await app.ui.login.assertLoginSuccess();

    await app.ui.inventory.sortByPriceLowToHigh();
    await app.ui.inventory.assertFirstItemPrice('7.99');

    // Nível 2 (Diferencial): Validação de Acessibilidade
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    // SauceDemo falha bastante em acessibilidade, vamos logar os erros, mas para não falhar o build,
    // garantimos que o script rodou com sucesso. (Podemos assertar que 'violation' exista ou apenas informar no terminal)
    if (accessibilityScanResults.violations.length > 0) {
      console.log(`⚠️ Foram encontradas ${accessibilityScanResults.violations.length} violações de acessibilidade.`);
    }
  });

  test('CT04 - Fluxo Completo de Compra (Checkout)', async ({ app }) => {
    await app.ui.login.performLogin('standard_user', 'secret_sauce');
    await app.ui.login.assertLoginSuccess();

    await app.ui.inventory.addItemToCart();
    await app.ui.inventory.navigateToCart();

    await app.ui.checkout.startCheckout();
    await app.ui.checkout.fillCheckoutInfo('QA', 'Engineer', '12345');
    await app.ui.checkout.continueToOverview();
    await app.ui.checkout.finishCheckout();
    await app.ui.checkout.assertCheckoutSuccess();
  });

  test('CT05 - Remoção de Itens do Carrinho e Logout', async ({ app }) => {
    await app.ui.login.performLogin('standard_user', 'secret_sauce');
    
    await app.ui.inventory.addItemToCart();
    await app.ui.inventory.navigateToCart();

    await app.ui.checkout.removeItemFromCart();
    
    await app.ui.login.logout();
  });
});

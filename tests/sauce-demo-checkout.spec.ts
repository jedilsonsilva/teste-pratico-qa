import { test, expect } from '@playwright/test';

test('CT04 - Fluxo de Compra e Checkout Completo (Sauce Demo)', async ({ page }) => {
  // Acesse a página de login
  await page.goto('https://www.saucedemo.com/');
  
  // Login
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // Valida redirecionamento
  await expect(page).toHaveURL(/.*inventory.html/);

  // Adiciona produto ao carrinho
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  
  // Acessa carrinho
  await page.locator('.shopping_cart_link').click();
  await expect(page).toHaveURL(/.*cart.html/);

  // Inicia checkout
  await page.locator('[data-test="checkout"]').click();

  // Preenche informações
  await page.locator('[data-test="firstName"]').fill('QA');
  await page.locator('[data-test="lastName"]').fill('Teste');
  await page.locator('[data-test="postalCode"]').fill('12345-678');
  await page.locator('[data-test="continue"]').click();

  // Finaliza a compra
  await page.locator('[data-test="finish"]').click();

  // Valida sucesso
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});

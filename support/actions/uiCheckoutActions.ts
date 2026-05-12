import { Page, expect } from '@playwright/test';

export function createUiCheckoutActions(page: Page) {
  return {
    async removeItemFromCart() {
      await page.locator('.cart_button').first().click();
      await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
    },

    async startCheckout() {
      await page.locator('.checkout_button').click();
      await expect(page).toHaveURL(/.*checkout-step-one.html/);
    },

    async fillCheckoutInfo(firstName: string, lastName: string, zipCode: string) {
      await page.getByPlaceholder('First Name').fill(firstName);
      await page.getByPlaceholder('Last Name').fill(lastName);
      await page.getByPlaceholder('Zip/Postal Code').fill(zipCode);
    },

    async continueToOverview() {
      await page.locator('.cart_button').click();
      await expect(page).toHaveURL(/.*checkout-step-two.html/);
    },

    async finishCheckout() {
      await page.locator('.cart_button').click();
      await expect(page).toHaveURL(/.*checkout-complete.html/);
    },

    async assertCheckoutSuccess() {
      await expect(page.getByRole('heading', { name: 'THANK YOU FOR YOUR ORDER' })).toBeVisible();
    }
  };
}

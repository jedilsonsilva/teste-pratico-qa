import { Page, expect } from '@playwright/test';

export function createUiLoginActions(page: Page) {
  return {
    async navigateToLogin() {
      await page.goto('https://www.saucedemo.com/');
      await expect(page).toHaveURL('https://www.saucedemo.com/');
    },
    
    async fillCredentials(username: string, password: string) {
      await page.getByPlaceholder('Username').fill(username);
      await page.getByPlaceholder('Password').fill(password);
    },

    async submit() {
      await page.locator('[data-test="login-button"]').click();
    },

    async performLogin(username: string, password: string) {
      await this.fillCredentials(username, password);
      await this.submit();
    },
    
    async assertLoginError(errorMessage: string) {
      await expect(page.getByText(errorMessage)).toBeVisible();
      await expect(page).not.toHaveURL(/.*inventory.html/);
    },

    async assertLoginSuccess() {
      await expect(page).toHaveURL(/.*inventory.html/);
      await expect(page.getByText('Products')).toBeVisible();
    },
    
    async logout() {
      await page.getByRole('button', { name: 'Open Menu' }).click();
      await page.getByRole('link', { name: 'Logout' }).click();
      await expect(page).toHaveURL('https://www.saucedemo.com/');
      await expect(page.locator('[data-test="login-button"]')).toBeVisible();
    }
  };
}

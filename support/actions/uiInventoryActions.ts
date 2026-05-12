import { Page, expect } from '@playwright/test';

export function createUiInventoryActions(page: Page) {
  return {
    async sortByPriceLowToHigh() {
      await page.locator('.product_sort_container').selectOption('lohi');
    },

    async assertFirstItemPrice(expectedPrice: string) {
      const firstItemPrice = page.locator('.inventory_item_price').first();
      await expect(firstItemPrice).toContainText(expectedPrice);
    },

    async addItemToCart() {
      await page.locator('.btn_inventory').first().click();
      await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    },

    async navigateToCart() {
      await page.locator('.shopping_cart_link').click();
      await expect(page).toHaveURL(/.*cart.html/);
    }
  };
}

import { Page, Locator, expect } from '@playwright/test';

class CartPage {
  private page: Page;
  private cartItem: Locator;
  private checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItem = page.locator('.cart_item');
    this.checkoutButton = page.locator('#checkout');
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}

export { CartPage };
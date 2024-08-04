import { Page, Locator, expect } from '@playwright/test';

export class inventoryPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly firstItemAddToCartButton: Locator;
    readonly shoppingCartButton: Locator;
  
    constructor(page: Page) {
      this.page = page;
      this.pageTitle = page.locator('.title');
      this.firstItemAddToCartButton = page.locator('#add-to-cart-sauce-labs-backpack');
      this.shoppingCartButton = page.locator('.shopping_cart_link');
    }

    async getPageTitle() {
        return this.pageTitle.textContent();
    }

    async validatePageTitle() {
        const title = await this.getPageTitle();
        expect(title).toBe('Products');
        await this.pageTitle.waitFor({ state: 'visible' });
    }

    async addItemToCart() {
        await this.firstItemAddToCartButton.click();
    }
    
    async goToCart() {
        await this.shoppingCartButton.click();
      } 
  };
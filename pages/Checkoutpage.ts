import { Page, Locator, expect } from '@playwright/test';

class CheckoutPage {
  private page: Page;
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private postalCodeInput: Locator;
  private continueButton: Locator;
  private finishButton: Locator;
  private thankYouMessage: Locator;
  private dispatchMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.finishButton = page.locator('#finish');
    this.thankYouMessage = page.locator('.complete-header');
    this.dispatchMessage = page.locator('.complete-text');
  }

  async enterCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueCheckout() {
    await this.continueButton.click();
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async verifyThankYouMessage() {
    await expect(this.thankYouMessage).toHaveText('Thank you for your order!');
    await expect(this.dispatchMessage).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
  }
}

export { CheckoutPage };
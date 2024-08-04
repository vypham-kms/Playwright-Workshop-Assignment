import { expect, test } from '@playwright/test';
import { loginPage } from '../pages/login.page';
import { inventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/Cart.page';
import { CheckoutPage } from '../pages/Checkout.page';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.qa' });

test('TC001 - Verify error message appears when login with invalid user', async ({ page }) => {
    const LoginPage = new loginPage(page);

    const invalidUsername = process.env.INVALID_USERNAME || '';
    const password = process.env.PASSWORD || '';
    const errorMessage = process.env.ERROR_MESSAGE || '';
  
    await LoginPage.goto();
    await LoginPage.loginKey(invalidUsername, password);
    await LoginPage.clickLoginButton();
    await LoginPage.getErrorMessageText(errorMessage);
  });

test('TC002 - Verify user can order product successfully', async ({ page }) => {
  const LoginPage = new loginPage(page);
  const InventoryPage = new inventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  const username001 = process.env.USERNAME001 || '';
  const password = process.env.PASSWORD || '';
  
  await LoginPage.goto();
  await LoginPage.loginKey(username001, password);
  await LoginPage.clickLoginButton();
    
  await InventoryPage.getPageTitle();
  await InventoryPage.validatePageTitle();

  await InventoryPage.addItemToCart();
  await InventoryPage.goToCart();
  await cartPage.checkout();

  await checkoutPage.enterCheckoutInformation('FirstName', 'LastName', '12345');
  await checkoutPage.continueCheckout();
  await checkoutPage.finishCheckout();
  await checkoutPage.verifyThankYouMessage();
});
import { expect, test } from '@playwright/test';
import { loginPage } from '../pages/loginpage';
import { inventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/Cartpage';
import { CheckoutPage } from '../pages/Checkoutpage';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.qa' });

test('TC001 - Verify error message appears when login with invalid user', async ({ page }) => {
    const LoginPage = new loginPage(page);

    const invalidUsername = 'locked_out_user';
    const password = 'secret_sauce';
  
    await LoginPage.goto();
    await LoginPage.loginKey(invalidUsername , password);
    await LoginPage.clickLoginButton();

    const errorMessage = await LoginPage.getErrorMessageText();
    expect(errorMessage).toBe('Epic sadface: Sorry, this user has been locked out.'); 
  });

test('TC002 - Verify user can order product successfully', async ({ page }) => {
  const LoginPage = new loginPage(page);
  const InventoryPage = new inventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  
  await LoginPage.goto();
  await LoginPage.loginKey('standard_user', 'secret_sauce');
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
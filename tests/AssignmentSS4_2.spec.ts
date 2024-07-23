import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    console.log('beforeEach: Start the page');
    await page.goto('https://www.saucedemo.com/inventory.html/');
    await page.fill('input[data-test="username"]', 'standard_user');
    await page.fill('input[data-test="password"]', 'secret_sauce');
    await page.click('input[data-test="login-button"]');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

//TC001 - Verify sort by price
test('TC001 - Verify sort by price', async ({ page }) => {
    // Validate "Products" title is visible
    const productsTitle = page.locator('.title');
    await expect(productsTitle).toBeVisible();
    await expect(productsTitle).toHaveText('Products');

    // Select "sort by price (low to high)"
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

    // Get the list of prices
    const priceElements = page.locator('.inventory_item_price');
    const pricesText = await priceElements.allTextContents();
    const prices = pricesText.map(price => parseFloat(price.replace('$', '')));

    // Validate the prices are sorted from low to high
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }

});

//TC002 - Verify user can order product
test('TC002 - Verify user can order product', async ({page}) => {
    const productsTitle = page.locator('.title');
    await expect(productsTitle).toBeVisible();
    await expect(productsTitle).toHaveText('Products');

    // Click "Add to cart" on the first item
    const firstAddToCartButton = page.locator('#add-to-cart-sauce-labs-onesie');
    await firstAddToCartButton.click();

    // Validate the button text changed to "Remove"
    const RemoveCartButton = page.locator('#remove-sauce-labs-onesie');
    await expect(RemoveCartButton).toHaveText('Remove');

    // Validate the cart has number '1'
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');

    // Click on the cart
    await page.click('.shopping_cart_link');

    // Validate the pre-added item is visible
    const cartItem = page.locator('.cart_item');
    await expect(cartItem).toBeVisible();

    // Click checkout
    await page.click('#checkout');

    // Input all required fields
    await page.fill('#first-name', 'Vy');
    await page.fill('#last-name', 'Pham');
    await page.fill('#postal-code', '12345');

    // Validate the corresponding fields display input text
    const firstNameInput = page.locator('#first-name');
    const lastNameInput = page.locator('#last-name');
    const postalCodeInput = page.locator('#postal-code');
    await expect(firstNameInput).toHaveValue('Vy');
    await expect(lastNameInput).toHaveValue('Pham');
    await expect(postalCodeInput).toHaveValue('12345');

    // Click Continue
    await page.click('#continue');

    // Validate checkout page has item added earlier
    const summaryItem = page.locator('.cart_item');
    await expect(summaryItem).toBeVisible();

    // Click Finish
    await page.click('#finish');

    // Validate thank you message
    const thankYouMessage = page.locator('.complete-header');
    const dispatchMessage = page.locator('.complete-text');
    await expect(thankYouMessage).toHaveText('Thank you for your order!');
    await expect(dispatchMessage).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
});
import { test, expect } from '@playwright/test';

test('Verify Dynamically Loaded Page', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Dynamic Loading' }).click();

  const dynamicHeader = page.locator('h3');
  await expect(dynamicHeader).toHaveText('Dynamically Loaded Page Elements');
 
  await page.getByRole('link', { name: 'Example 1: Element on page' }).click();

  await expect(dynamicHeader).toHaveText('Dynamically Loaded Page Elements');

  await page.getByRole('button', { name: 'Start' }).click();
  await page.waitForSelector('#loading', { state: 'hidden' });

  await expect(page.locator('#finish')).toHaveText('Hello World!');
});
import { test, expect } from '@playwright/test';

test('Verify input', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  await expect(page.locator('h1')).toHaveText('Automation Testing Practice');

  await page.locator('#name').click();
  await page.locator('#name').fill('Vy');

  const nameInput = page.locator('#name');
  const nameValue = await nameInput.inputValue();
  expect(nameValue).toBe('Vy');

  await page.getByLabel('Address:').click();
  await page.getByLabel('Address:').fill('dn');

  const addressInput = page.getByLabel('Address:');
  const addressValue = await addressInput.inputValue();
  expect(addressValue).toBe('dn');

  await nameInput.clear();
  await expect(page.locator('#name')).toBeEmpty();
  await addressInput.clear();
  await expect(page.getByLabel('Address:')).toBeEmpty();
});
import { test, expect } from '@playwright/test';

test('Verify Dropdown', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Dropdown' }).click();

  await page.selectOption('#dropdown', { label: 'Option 2' });
  const selectedOption = page.locator('#dropdown option:checked');
  await expect(selectedOption).toHaveText('Option 2');

  await page.selectOption('#dropdown', { index: 1 });
  await expect(selectedOption).toHaveText('Option 1');

  await page.selectOption('#dropdown', { value: '2' });
  await expect(selectedOption).toHaveText('Option 2');
});
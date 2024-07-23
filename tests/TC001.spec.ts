import { test, expect } from '@playwright/test';

test('Verify Checkboxes', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Checkboxes' }).click();

  const header = page.locator('h3');
  await expect(header).toHaveText('Checkboxes');
  await page.getByRole('checkbox').first().check();
  await page.getByRole('checkbox').nth(1).uncheck();

  await expect(page.getByRole('checkbox').first()).toBeChecked();
  await page.getByRole('checkbox').nth(1).check();
});
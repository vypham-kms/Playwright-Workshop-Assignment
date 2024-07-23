import { test, expect } from '@playwright/test';

test('Verify Drag and Drop', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Drag and Drop' }).click();

  const header = page.locator('h3');
  await expect(header).toHaveText('Drag and Drop');

  const columnA = page.locator('#column-a');
  const columnB = page.locator('#column-b');
  await columnA.dragTo(columnB);
  await expect(columnA).toHaveText('B');
  await expect(columnB).toHaveText('A');
  
});
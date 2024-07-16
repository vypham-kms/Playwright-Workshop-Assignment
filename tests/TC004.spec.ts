import { test, expect } from '@playwright/test';

test('Verify Frames', async ({ page }) => {
  await page.goto('https://www.globalsqa.com/demo-site/frames-and-windows/');
  const header = page.locator('h1');
  await expect(header).toHaveText('Frames And Windows');

  await page.getByRole('tab', { name: 'iFrame' }).click();

  let frame = page.frameLocator('iframe[name="globalSqa"]')
  await frame.getByRole('textbox').fill('Playwright');
  await expect(frame.getByRole('textbox')).toHaveValue('Playwright');

  await page.frameLocator('iframe[name="globalSqa"]').getByRole('button').click();
  const message = frame.locator('.search_res');
  await expect(message).toHaveText('Sorry, no posts matched your criteria.');
});
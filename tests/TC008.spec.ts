import { test, expect } from '@playwright/test';

test('Prompt dialog', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  await expect(page.locator('h1')).toContainText('Automation Testing Practice');
  
  page.on('dialog', async dialog => {
  expect(dialog.type()).toContain('prompt');
  expect(dialog.message()).toContain('Please enter your name:');
  expect(dialog.defaultValue()).toBe('Harry Potter');

  const customName = 'Vy';
  await dialog.accept(customName);

  const messageElement = page.locator('#demo');
  const expectedMessage = `Hello ${customName}! How are you today?`;
  await expect(messageElement).toContainText(expectedMessage);
})
await page.getByRole('button', { name: 'Prompt' }).click();
});
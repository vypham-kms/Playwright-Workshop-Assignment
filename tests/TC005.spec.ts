import { test, expect } from '@playwright/test';

test('Verify Upload file', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'File Upload' }).click();
  await page.locator('#file-upload').click();

  const header = page.locator('h3');
  await expect(header).toHaveText('File Uploader');
  await page.locator('#file-upload').setInputFiles('./tests/temp.txt');
  await page.waitForTimeout(5000);

  await page.getByRole('button', { name: 'Upload' }).click();
  await expect(page.locator('#uploaded-files')).toContainText('temp.txt');
});
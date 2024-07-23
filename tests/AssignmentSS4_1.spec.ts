import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
    console.log('beforeEach: Navigating to the start page.');
    await page.goto('/');
})

test.skip('TC001-Verify Checkboxes', {tag: '@smkoke'}, async ({ page }) => {
//   await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Checkboxes' }).click();

  const header = page.locator('h3');
  await expect(header).toHaveText('Checkboxes');
  await page.getByRole('checkbox').first().check();
  await page.getByRole('checkbox').nth(1).uncheck();

  await expect(page.getByRole('checkbox').first()).toBeChecked();
  await page.getByRole('checkbox').nth(1).check();
});

test('TC002-Verify Drag and Drop', {tag: '@smkoke'}, async ({ page }) => {
//   await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Drag and Drop' }).click();

  const header = page.locator('h3');
  await expect(header).toHaveText('Drag and Drop');

  const columnA = page.locator('#column-a');
  const columnB = page.locator('#column-b');
  await columnA.dragTo(columnB);
  await expect(columnA).toHaveText('B');
  await expect(columnB).toHaveText('A');
  
});

test.fail('TC003-Verify Dropdown', {tag: '@smkoke'}, async ({ page }) => {
//   await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Dropdown' }).click();

  await page.selectOption('#dropdown', { label: 'Option 2' });
  const selectedOption = page.locator('#dropdown option:checked');
  await expect(selectedOption).toHaveText('Option 2');

  await page.selectOption('#dropdown', { index: 1 });
  await expect(selectedOption).toHaveText('Option 1');

  await page.selectOption('#dropdown', { value: '2' });
  await expect(selectedOption).toHaveText('Option 2');
});

test('TC005-Verify Upload file', {tag: '@regression'}, async ({ page }) => {
//   await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'File Upload' }).click();
  await page.locator('#file-upload').click();

  const header = page.locator('h3');
  await expect(header).toHaveText('File Uploader');
  await page.locator('#file-upload').setInputFiles('./tests/temp.txt');
  await page.waitForTimeout(5000);

  await page.getByRole('button', { name: 'Upload' }).click();
  await expect(page.locator('#uploaded-files')).toContainText('temp.txt');
});

test('TC006-Verify Dynamically Loaded Page', {tag: '@regression'}, async ({ page }) => {
//   await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Dynamic Loading' }).click();

  const dynamicHeader = page.locator('h3');
  await expect(dynamicHeader).toHaveText('Dynamically Loaded Page Elements');
 
  await page.getByRole('link', { name: 'Example 1: Element on page' }).click();

  await expect(dynamicHeader).toHaveText('Dynamically Loaded Page Elements');

  await page.getByRole('button', { name: 'Start' }).click();
  await page.waitForSelector('#loading', { state: 'hidden' });

  await expect(page.locator('#finish')).toHaveText('Hello World!');
});
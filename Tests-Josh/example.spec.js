// @ts-check
import { test, expect } from '@playwright/test';
 
test('visit homepage, click "Find a Team", and fill out the form', async ({ page }) => {
  await page.goto('https://teamzlitdev.onrender.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
 
  const findTeamButton = page.locator('text=Find a Team');
  await findTeamButton.waitFor({ state: 'visible', timeout: 10000 });
  await findTeamButton.click();
 
  await expect(page).toHaveURL('https://teamzlitdev.onrender.com/findTeam');
 
  // Fill in the username field
  await page.waitForSelector('input[name="username"]', { timeout: 10000 });
  await page.fill('input[name="username"]', 'Josh.Test');
 
  // Fill in the email field
  await page.waitForSelector('input[name="email"]', { timeout: 10000 });
  await page.fill('input[name="email"]', 'JoshTest@gmail.com');
 
  // Click the "Select a role" dropdown using SelectTrigger
  const selectRoleButton = page.locator('button:has-text("Select a role")');
  await selectRoleButton.click();
 
  // Wait for the "Developer" option to appear in the dropdown and click it
  const developerOption = page.locator('[data-value=""]'); // Adjust to match the actual `SelectItem` identifier
  await developerOption.waitFor({ state: 'visible', timeout: 5000 });
  await developerOption.click();
 
  // Continue with additional fields as needed
});
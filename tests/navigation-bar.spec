import { test, expect } from '@playwright/test';

test.describe('NavigationBar Component', () => {
  const devServerURL = 'http://127.0.0.1:3000'; // Update if your development server URL is different

  test.beforeEach(async ({ page }) => {
    // Navigate to the dev server URL
    await page.goto(devServerURL);
  });

  test('should render the logo and navigation links', async ({ page }) => {
    // Check if the logo is visible
    const logo = page.locator('img[alt="Logo"]');
    await expect(logo).toBeVisible();

    // Check if navigation links are visible and correct
    const navLinks = page.locator('.nav-link');
    const expectedLinks = ['Home', 'Page 1', 'Find Team', 'Create Team'];

    // Verify the count of navigation links
    await expect(navLinks).toHaveCount(expectedLinks.length);

    // Verify the text of each navigation link
    for (const [index, text] of expectedLinks.entries()) {
      await expect(navLinks.nth(index)).toHaveText(text);
    }
  });

  test('should navigate to the correct pages', async ({ page }) => {
    const navLinks = page.locator('.nav-link');

    // Home
    await navLinks.nth(0).click();
    await expect(page).toHaveURL(`${devServerURL}/`); // Base path

    // Page 1
    await navLinks.nth(1).click();
    await expect(page).toHaveURL(`${devServerURL}/page1`);

    // Find Team
    await navLinks.nth(2).click();
    await expect(page).toHaveURL(`${devServerURL}/findTeam`);

    // Create Team
    await navLinks.nth(3).click();
    await expect(page).toHaveURL(`${devServerURL}/createTeam`);
  });
});
 
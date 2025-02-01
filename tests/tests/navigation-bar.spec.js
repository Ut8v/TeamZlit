import { test, expect } from '@playwright/test';

test.describe('NavigationBar Component', () => {
  // Define the base URL
  const PAGE_URL = process.env.PAGE_URL || 'http://localhost:5173';

  test.beforeEach(async ({ page }) => {
    // Navigate to the base URL before each test
    await page.goto(PAGE_URL);
  });

  test('should render the logo and navigation links', async ({ page }) => {
    // Check if the logo is visible
    const logo = page.locator('img[alt="Logo"]');
    await expect(logo).toBeVisible();

    // Check if navigation links are visible and contain correct text
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

    // Test navigation for each link
    await navLinks.nth(0).click();
    await expect(page).toHaveURL(`${PAGE_URL}/`); // Home

    await navLinks.nth(1).click();
    await expect(page).toHaveURL(`${PAGE_URL}/page1`); // Page 1

    await navLinks.nth(2).click();
    await expect(page).toHaveURL(`${PAGE_URL}/findTeam`); // Find Team

    await navLinks.nth(3).click();
    await expect(page).toHaveURL(`${PAGE_URL}/createTeam`); // Create Team
  });
});

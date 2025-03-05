import { test, expect } from '@playwright/test';

  test('should log in, navigate to create team, and fill out the form', async ({ page }) => {
  // Step 1: Navigate to the Login page
  console.log('Navigating to the Login page...');
  await page.goto('http://localhost:5173/');


  // Step 2: Fill in login credentials
  console.log('Filling in login credentials...');
  await page.fill('input[name="email"]', 'julianandresmolina19@outlook.com');
  await page.fill('input[name="password"]', 'Jumo24@!');

  // Step 3: Click the submit button to log in
  console.log('Submitting login form...');
  await page.click('button[type="submit"]');

  // Step 4: Wait for navigation to complete after login
  console.log('Waiting for the page to load...');
  await page.waitForLoadState('networkidle');

  // Step 5: Verify the navigation bar elements
  console.log('Checking navigation bar links...');
  const navLinks = await page.locator('a.nav-link');
  const expectedLinks = ['/home', '/findTeam', '/createTeam', '/teamIndex'];

  // Verify that all expected links are present
  await expect(navLinks).toHaveCount(expectedLinks.length);
  for (const [index, link] of expectedLinks.entries()) {
    await expect(navLinks.nth(index)).toHaveAttribute('href', link);
  }

  console.log('Navigation bar verification successful.');
});

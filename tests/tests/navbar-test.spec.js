import { test, expect } from '@playwright/test';
require('dotenv').config();

test('should log in, check navigation bar links, and verify expected navigation', async ({ page }) => {
    test.setTimeout(60000);

    // Step 1: Navigate to the Login page
    console.log('Navigating to the Login page...');
    await page.goto(process.env.PAGE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });

    console.log('Waiting for the page to fully load...');
    await page.waitForLoadState('networkidle');

    // Step 2: Fill in login credentials
    console.log('Filling in login credentials...');
    await page.fill('input[name="email"]', process.env.TEST_USER_EMAIL);
    await page.fill('input[name="password"]', process.env.TEST_USER_PASSWORD);

    // Step 3: Click the submit button to log in
    console.log('Submitting login form...');
    await page.click('button[type="submit"]');

    // Step 4: Wait for navigation to complete after login
    console.log('Waiting for the page to load after login...');
    await page.waitForURL(`${process.env.PAGE_URL}/home`, { timeout: 30000 });

    console.log('Verifying navigation...');
    const currentURL = await page.url();
    console.log(`Current URL after login: ${currentURL}`);

    if (currentURL !== `${process.env.PAGE_URL}/home`) {
        console.error('Login failed or incorrect redirection! Taking screenshot...');
        await page.screenshot({ path: 'login-error.png' });
        return;
    }

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

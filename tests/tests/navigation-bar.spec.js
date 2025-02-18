import { test, expect } from '@playwright/test';

test('should log in and verify navigation bar elements', async ({ page }) => {
    // Step 1: Navigate to the Login page
    console.log('Navigating to the Login page...');
    await page.goto('http://localhost:5173');

    // Step 2: Fill in login credentials
    console.log('Filling in login credentials...');
    await page.fill('input[name="email"]', 'julianandresmolina19@outlook.com');
    await page.fill('input[name="password"]', 'Jumo24@!');

    // Step 3: Submit login form
    console.log('Submitting login form...');
    await page.click('button[type="submit"]');

    // Wait for navigation to complete
    await page.waitForLoadState('networkidle');

    // Step 4: Verify navigation bar links
    console.log('Checking navigation bar links...');
    const expectedLinks = ['/home', '/findTeam', '/createTeam', '/teamIndex'];
    for (const link of expectedLinks) {
        await expect(page.locator(`a.nav-link[href="${link}"]`)).toBeVisible();
        console.log(`Verified navigation link: ${link}`);
    }

    console.log('Navigation bar verification successful.');
});

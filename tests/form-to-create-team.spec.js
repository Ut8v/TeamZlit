import { test, expect } from '@playwright/test';

test('should log in, navigate to create team, and fill out the form', async ({ page }) => {
    test.setTimeout(60000); // Increase timeout

    console.log('Navigating to Login page...');
    await page.goto('https://teamzlitdev.onrender.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });

    console.log('Waiting for page to fully load...');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    console.log('Entering login credentials...');
    await page.fill('input[name="email"]', 'julianandresmolina19@outlook.com');
    await page.fill('input[name="password"]', 'Jumo24@!');

    console.log('Submitting login form...');
    await page.click('button[type="submit"]');

    console.log('Waiting for redirect to Home page...');
    await page.waitForURL('https://teamzlitdev.onrender.com/home', { timeout: 30000 });

    console.log('Navigating to "Create Team" page...');
    await page.goto('https://teamzlitdev.onrender.com/createTeam', { waitUntil: 'domcontentloaded' });

    await page.waitForTimeout(3000); // Give extra time for the page to load

    console.log('Verifying navigation...');
    const currentURL = await page.url();
    console.log(`Current URL: ${currentURL}`);

    if (currentURL !== 'https://teamzlitdev.onrender.com/createTeam') {
        console.error('Navigation to Create Team page failed!');
        await page.screenshot({ path: 'navigation-error.png' });
        return;
    }

    console.log('Checking if the Create Team form is visible...');
    try {
        await page.waitForSelector('input[placeholder="Capstone Team"]', { timeout: 20000, state: 'visible' });
        console.log('Create Team form found!');
    } catch (error) {
        console.error('Create Team form not found! Taking screenshot...');
        await page.screenshot({ path: 'form-error.png' });
        throw error;
    }

    console.log('Filling in "Team Name"...');
    await page.fill('input[placeholder="Capstone Team"]', 'Test Team Name');

    console.log('Filling out "Team Description"...');
    await page.fill('textarea[name="teamDescription"]', 'This is a test team description.');

    console.log('Checking visibility option...');
    await page.check('#visibility-public');

    console.log('Selecting skills...');
    const skillsToSelect = ['#SQL', '#Agile', '#Python'];
    for (const skill of skillsToSelect) {
        await page.click(skill);
    }

    console.log('Submitting the "Create Team" form...');
    await page.click('button[type="submit"]');

    console.log('Form submission complete.');
});
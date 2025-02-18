import { test, expect } from '@playwright/test';

test('should log in, navigate to create team, and fill out the form', async ({ page }) => {
    // Step 1: Navigate to the Login page
    console.log('Navigating to the Login page...');
    await page.goto('http://localhost:5173/');

    // Step 2: Fill in login credentials
    console.log('Filling in login credentials...');
    await page.fill('input[name="email"]', 'julianandresmolina19@outlook.com');
    await page.fill('input[name="password"]', 'Jumo24@!');

    // Step 3: Submit login form
    console.log('Submitting login form...');
    await page.click('button[type="submit"]');

    // Wait for navigation to complete
    await page.waitForLoadState('networkidle');

    // Step 4: Navigate to Create Team page
    console.log('Navigating to the Create Team page...');
    await page.click('a.nav-link[href="/createTeam"]');

    // Step 5: Wait for the form to load
    console.log('Waiting for the form to load...');
    await page.waitForSelector('input[name="teamName"]');

    // Step 6: Fill out the form
    console.log('Filling out the form fields...');
    await page.fill('input[name="teamName"]', 'Test Team Name');
    await page.fill('textarea[name="teamDescription"]', 'This is a test team description.');
    await page.check('input[name="visibility"][value="public"]');

    // Select multiple skills
    console.log('Selecting multiple skills...');
    const skillsToSelect = ['SQL', 'Agile Methodologies', 'Python'];
    for (const skill of skillsToSelect) {
        await page.click(`text=${skill}`);
        console.log(`Selected skill: ${skill}`);
    }

    // Step 7: Submit the form
    console.log('Submitting the form...');
    await page.click('button[type="submit"]');

    // Verify submission (No success message check required)
    console.log('Form submission complete.');
});

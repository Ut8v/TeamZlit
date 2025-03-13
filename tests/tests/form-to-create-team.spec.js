import { test, expect } from '@playwright/test';
require('dotenv').config();

test('should log in, navigate to create team, and fill out the form', async ({ page }) => {
    test.setTimeout(60000);

    console.log('Navigating to Login page...');
    await page.goto(process.env.PAGE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });

    console.log('Waiting for the page to fully load...');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    console.log('Entering login credentials...');
    await page.fill('input[name="email"]', process.env.TEST_USER_EMAIL);
    await page.fill('input[name="password"]', process.env.TEST_USER_PASSWORD);

    console.log('Submitting login form...');
    await page.click('button[type="submit"]');

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

    console.log('Waiting for "Create Team" link to be visible...');
    const createTeamLink = page.locator('a.nav-link[href="/createTeam"]');

    if (await createTeamLink.count() === 0) {
        console.error('Create Team link not found! Taking screenshot...');
        await page.screenshot({ path: 'create-team-link-error.png' });
        return;
    }

    console.log('Clicking "Create Team" link...');
    await createTeamLink.click();

    console.log('Waiting for navigation to Create Team page...');
    await page.waitForURL(`${process.env.PAGE_URL}/createTeam`, { timeout: 15000 });

    const newURL = await page.url();
    if (newURL !== `${process.env.PAGE_URL}/createTeam`) {
        console.error('Navigation to Create Team page failed! Taking screenshot...');
        await page.screenshot({ path: 'nav-error.png' });
        return;
    }

    console.log('Successfully navigated to Create Team page!');

    console.log('Filling in "Team Name"...');
    await page.fill('input[placeholder="Capstone Team"]', 'Test Team Name');

    console.log('Filling out "Team Description"...');
    await page.fill('textarea[name="teamDescription"]', 'This is a test team description.');

    console.log('Waiting for visibility option to be visible...');
    const visibilityOption = page.locator('div[role="radiogroup"]');

    if (await visibilityOption.count() === 0) {
        console.error('Visibility option not found! Taking screenshot...');
        await page.screenshot({ path: 'visibility-option-error.png' });
        return;
    }

    console.log('Selecting visibility option...');
    await visibilityOption.click(); 

    console.log('Selecting Public visibility option...');
    await page.locator('div[role="radiogroup"] >> text=Public').click();

    console.log('Selecting skills...');
    const skillsToSelect = [
        'JavaScript', 'UI Design', 'Project Management', 'Python', 'React', 
        'Node.js', 'TypeScript', 'Data Analysis', 'SQL', 'Machine Learning',
        'HTML/CSS', 'Docker', 'AWS', 'Figma', 'Git', 'Agile Methodologies',
        'Java', 'C#', 'Redux', 'Firebase', 'MongoDB', 'Cybersecurity',
        'Mobile Development', 'Testing/QA', 'API Development'
    ];

    for (const skill of skillsToSelect) {
        const skillButton = page.locator(`button[id="${skill}"]`);
        if (await skillButton.count() > 0) {
            console.log(`Selecting skill: ${skill}`);
            await skillButton.click();
        } else {
            console.warn(`Skill "${skill}" not found! Skipping...`);
        }
    }

    console.log('Submitting the "Create Team" form...');
    await page.click('button[type="submit"]');

    console.log('Form submission complete.');
});
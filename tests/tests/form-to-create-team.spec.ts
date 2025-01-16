import { test, expect } from '@playwright/test';

test.describe('Form to Create Team', () => {
  test('should submit the form successfully', async ({ page }) => {
    // Navigate to the page where the form is hosted
    await page.goto('http://localhost:3000'); // Replace with your app's URL

    // Fill out the form fields
    await page.fill('input[placeholder="Capstone Team"]', 'Dream Team');
    await page.click('text=Select a team type');
    await page.click('text=Development Team');
    await page.check('text=Public');
    await page.fill('textarea[placeholder="A team to develop a web application"]', 'A team focused on building amazing web apps');
    await page.fill('input[placeholder="Roles go here"]', 'Frontend Developer, Backend Developer');
    await page.check('text=React');
    await page.check('text=Node.js');
    await page.fill('textarea[placeholder="Enter any additional notes"]', 'We are excited to start!');
    await page.fill('input[placeholder="Enter your email"]', 'test@example.com');
    //form for test
    // Submit the form
    await page.click('button[type="submit"]');

    // Check for the success toast message
    const toastMessage = await page.locator('text=Form submitted successfully.');
    await expect(toastMessage).toBeVisible();
  });

  test('should show validation errors for missing fields', async ({ page }) => {
    // Navigate to the page where the form is hosted
    await page.goto('http://localhost:3000'); // Replace with your app's URL

    // Attempt to submit without filling the form
    await page.click('button[type="submit"]');

    // Check for validation errors
    const teamNameError = await page.locator('text=Team Name must be at least 3 characters.');
    const teamTypeError = await page.locator('text=Team Type is required.');
    const visibilityError = await page.locator('text=You need to select a visibility.');
    const emailError = await page.locator('text=Invalid email address.');

    await expect(teamNameError).toBeVisible();
    await expect(teamTypeError).toBeVisible();
    await expect(visibilityError).toBeVisible();
    await expect(emailError).toBeVisible();
  });
});
//
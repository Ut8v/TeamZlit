import { test, expect } from '@playwright/test';

test.describe('ProfileBar Component', () => {
  test.beforeEach(async ({ page }) => {
    // Replace with the actual path to the component if it's integrated in a page
    await page.goto('http://localhost:3000'); // Adjust the URL based on your dev environment setup
  });

  test('should render the profile picture', async ({ page }) => {
    const profilePic = await page.getByAltText('Profile');
    await expect(profilePic).toBeVisible();
    await expect(profilePic).toHaveAttribute('src', /user-profile-icon\.jpg$/); // Check that the image source is correct
  });

  test('should display user name and email', async ({ page }) => {
    const name = await page.locator('text=John Doe');
    const email = await page.locator('text=johndoe@example.com');

    await expect(name).toBeVisible();
    await expect(email).toBeVisible();
  });

  test('should render the logout button', async ({ page }) => {
    const logoutButton = await page.getByRole('button', { name: 'Logout' });
    await expect(logoutButton).toBeVisible();
  });
});

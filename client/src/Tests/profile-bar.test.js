const { test, expect } = require('@playwright/test');
const { render } = require('@testing-library/react');
const ProfileBar = require('../src/ProfileBar');  // Update the path according to your file structure

test.describe('ProfileBar Component', () => {

  test('should display profile picture', async ({ page }) => {
    const { container } = render(<ProfileBar />);
    const img = container.querySelector('img.profile-pic');
    expect(img).toBeTruthy();  // Check if the image exists
    expect(img).toHaveAttribute('alt', 'Profile');  // Check if alt text is correct
  });

  test('should display user name and email', async ({ page }) => {
    const { getByText } = render(<ProfileBar />);
    expect(getByText('John Doe')).toBeTruthy();  // Check if the name is rendered
    expect(getByText('johndoe@example.com')).toBeTruthy();  // Check if the email is rendered
  });

  test('should display logout button', async ({ page }) => {
    const { getByRole } = render(<ProfileBar />);
    const button = getByRole('button', { name: /Logout/i });
    expect(button).toBeTruthy();  // Check if the logout button exists
  });

  test('logout button should have correct class', async ({ page }) => {
    const { getByRole } = render(<ProfileBar />);
    const button = getByRole('button', { name: /Logout/i });
    expect(button).toHaveClass('logout-button');  // Check if the button has the correct class
  });

});

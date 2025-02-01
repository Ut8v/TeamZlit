import { test, expect } from '@playwright/test';

test('should fill out the form and submit successfully', async ({ page }) => {
  // Step 1: Navigate to the Create Team page
  console.log('Navigating to the Create Team page...');
  await page.goto('http://localhost:5173/createTeam');

  // Step 2: Wait for the page to fully load
  console.log('Waiting for the page to fully load...');
  await page.waitForLoadState('networkidle');

  // Step 3: Ensure the form is visible
  console.log('Waiting for the form to load...');
  await page.waitForSelector('input[name="teamName"]', { state: 'visible', timeout: 60000 });

  // Step 4: Fill out the form fields
  console.log('Filling out the form fields...');
  await page.locator('input[name="teamName"]').fill('Test Team'); // Team Name
  await page.locator('button[role="combobox"]').click(); // Open dropdown
  await page.locator('div[role="option"]:has-text("Development Team")').click(); // Select "Development Team"

  // Step 5: Select Team Visibility (Clicking the Button)
  console.log('Selecting the Team Visibility...');
  const visibilityButton = page.locator('button[role="radio"][value="public"]'); // Select Public
  await visibilityButton.waitFor({ state: 'visible', timeout: 60000 });
  await visibilityButton.click();
  await expect(visibilityButton).toHaveAttribute('aria-checked', 'true'); // Ensure it's selected

  // Step 6: Fill Team Description
  console.log('Filling out the Team Description...');
  await page.locator('textarea[name="teamDescription"]').fill('This is a test description.');

  // Step 7: Fill in the Roles
  console.log('Filling in the Roles...');
  await page.locator('input[name="roles"]').fill('Developer');

  // Step 8: Select multiple random skills
  console.log('Selecting multiple skills...');
  const skillNames = [
    'JavaScript', 'UI Design', 'Project Management', 'Python', 'React',
    'Node.js', 'TypeScript', 'Data Analysis', 'SQL', 'Machine Learning',
    'HTML/CSS', 'Docker', 'AWS', 'Figma', 'Git', 'Mobile Development',
    'Testing/QA', 'API Development', 'Agile Methodologies', 'Java', 'C#',
    'MongoDB', 'Cybersecurity', 'Redux', 'Firebase'
  ];

  // Randomly select 3 unique skills
  const selectedSkills = [];
  while (selectedSkills.length < 3) {
    const randomSkill = skillNames[Math.floor(Math.random() * skillNames.length)];
    if (!selectedSkills.includes(randomSkill)) {
      selectedSkills.push(randomSkill);
      console.log(`Selecting the skill: ${randomSkill}`);

      // Locate and click the skill button
      const skillButton = page.locator(`button[role="checkbox"][id="${randomSkill}"]`);
      await skillButton.waitFor({ state: 'visible', timeout: 60000 });
      await skillButton.click();

      // Verify that the skill is selected (aria-checked="true")
      await expect(skillButton).toHaveAttribute('aria-checked', 'true');
    }
  }

  console.log('Selected skills:', selectedSkills.join(', '));

  // Step 9: Fill in the Email
  console.log('Filling in the Email...');
  await page.locator('input[name="email"]').fill('test@example.com');

  // Step 10: Submit the form
  console.log('Submitting the form...');
  await page.locator('button[type="submit"]').click();

  // Step 11: Assert success
  console.log('Checking for success message...');
  await expect(page.locator('text=Form submitted successfully')).toBeVisible();
  console.log('Test passed successfully.');
});

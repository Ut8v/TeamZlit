// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests', // ✅ Ensure Playwright looks in the correct directory for tests
  testMatch: '**/*.spec.js', // ✅ Forces Playwright to recognize test files
  fullyParallel: true, // ✅ Run tests in files in parallel
  forbidOnly: !!process.env.CI, // ✅ Fail the build on CI if `test.only` is left in the source code
  retries: process.env.CI ? 2 : 0, // ✅ Retry tests in CI only
  workers: process.env.CI ? 1 : undefined, // ✅ Limit workers in CI to avoid excessive load
  reporter: 'html', // ✅ Generate an HTML report for test results

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: 'https://teamzlitdev.onrender.com/', // ✅ Ensures all tests default to the hosted website
    trace: 'on-first-retry', // ✅ Collect trace when retrying a failed test
    headless: true, // ✅ Run tests in headless mode (no browser UI)
    screenshot: 'only-on-failure', // ✅ Capture screenshots only when a test fails
    video: 'retain-on-failure', // ✅ Save video recordings of failed tests
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
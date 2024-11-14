import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

test('has title', async ({ page }) => {
  await page.goto(process.env.PAGE_URL);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/TeamZlit/);
});


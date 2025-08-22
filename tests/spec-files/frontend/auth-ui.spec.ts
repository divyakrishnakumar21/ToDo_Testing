import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3001';

test.describe('Auth UI', () => {
  test('signup and login flow', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByText('Create Account').click();
    await page.getByPlaceholder('Name').fill('Playwright User');
    await page.getByPlaceholder('Email').fill('playwrightuser@example.com');
  await page.getByPlaceholder('Password', { exact: true }).fill('pwtest123');
  await page.getByPlaceholder('Confirm Password').fill('pwtest123');
    await page.getByRole('button', { name: /sign up/i }).click();
    await expect(page.getByText('Sign Up Successful!')).toBeVisible();
    await page.getByRole('button', { name: /go to login/i }).click();
    await page.getByPlaceholder('Email').fill('playwrightuser@example.com');
    await page.getByPlaceholder('Password').fill('pwtest123');
    await page.getByRole('button', { name: /login/i }).click();
    await expect(page.getByText(/what's on your mind today/i)).toBeVisible();
  });

  test('forgot password flow', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByText('Forgot Password?').click();
    await page.getByPlaceholder('Enter your email').fill('playwrightuser@example.com');
    await page.getByRole('button', { name: /next/i }).click();
    await page.getByPlaceholder('Enter new password').fill('newpwtest123');
    await page.getByRole('button', { name: /reset password/i }).click();
    await expect(page.getByText(/password reset successful/i)).toBeVisible();
    await page.getByPlaceholder('Email').fill('playwrightuser@example.com');
    await page.getByPlaceholder('Password').fill('newpwtest123');
    await page.getByRole('button', { name: /login/i }).click();
    await expect(page.getByText(/what's on your mind today/i)).toBeVisible();
  });
});

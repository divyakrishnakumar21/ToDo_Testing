import { test, expect, request } from '@playwright/test';

const BASE_URL = 'http://localhost:3000/auth';

const testUser = {
  name: 'Playwright User',
  email: 'playwrightuser@example.com',
  password: 'pwtest123'
};

test.describe('Auth API', () => {
  test('signup, login, check-user, forgot-password', async () => {
    const api = await request.newContext();
    // Clean up test user if exists
    await api.delete(`${BASE_URL}/delete-user`, { data: { email: testUser.email } });
    // Signup
    const signupRes = await api.post(`${BASE_URL}/signup`, { data: testUser });
    expect(signupRes.ok()).toBeTruthy();
    const signupData = await signupRes.json();
    expect(signupData.message).toContain('Signup successful');
    // Login
    const loginRes = await api.post(`${BASE_URL}/login`, { data: { email: testUser.email, password: testUser.password } });
    expect(loginRes.ok()).toBeTruthy();
    const loginData = await loginRes.json();
    expect(loginData.message).toContain('Login successful');
    // Check user
    const checkRes = await api.post(`${BASE_URL}/check-user`, { data: { email: testUser.email } });
    expect(checkRes.ok()).toBeTruthy();
    const checkData = await checkRes.json();
    expect(checkData.exists).toBeTruthy();
    // Forgot password (reset)
    const forgotRes = await api.post(`${BASE_URL}/forgot-password`, { data: { email: testUser.email, password: 'newpwtest123' } });
    expect(forgotRes.ok()).toBeTruthy();
    const forgotData = await forgotRes.json();
    expect(forgotData.message).toContain('Password reset successful');
    // Login with new password
    const reloginRes = await api.post(`${BASE_URL}/login`, { data: { email: testUser.email, password: 'newpwtest123' } });
    expect(reloginRes.ok()).toBeTruthy();
    const reloginData = await reloginRes.json();
    expect(reloginData.message).toContain('Login successful');
    await api.dispose();
  });
});

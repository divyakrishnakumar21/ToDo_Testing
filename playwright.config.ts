import { defineConfig } from '@playwright/test';

const frontendPort = '3001';

export default defineConfig({
  testDir: 'tests/spec-files',
  timeout: 30000,
  retries: 0,
  use: {
    baseURL: `http://localhost:${frontendPort}`,
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});

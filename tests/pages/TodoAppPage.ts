import { Page } from '@playwright/test';

export class TodoAppPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/');
  }

  async addTask(title: string, description: string) {
  await this.page.getByPlaceholder('Title (required)').fill(title);
    await this.page.getByPlaceholder('Description').fill(description);
    await this.page.getByRole('button', { name: /add/i }).click();
  }

  getTaskRowByTitle(title: string) {
    // Find the row in the All Tasks table by title
    return this.page.locator('div').filter({ has: this.page.locator('h2', { hasText: 'All Tasks' }) })
      .locator('table tbody tr').filter({ has: this.page.getByRole('cell', { name: title }) });
  }

  async getTaskTitleCell(title: string) {
    // Get the cell for the task title in All Tasks table
    return this.getTaskRowByTitle(title).locator('td').nth(1);
  }

  async completeTask(title: string) {
  const row = this.getTaskRowByTitle(title);
  await row.locator('input[type="checkbox"]').first().check();
  }

  async deleteTask(title: string) {
    const row = this.getTaskRowByTitle(title);
    await row.locator('button', { hasText: 'Delete' }).click();
  }
}

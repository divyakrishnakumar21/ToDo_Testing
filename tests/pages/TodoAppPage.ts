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

  async getTaskTitleCell(table: 'all' | 'completed' | 'today', title: string) {
    // Find the row by matching the cell text in any table
    const row = await this.page.locator(`tr`).filter({ has: this.page.getByRole('cell', { name: title }) }).first();
    return row.locator('td').first();
  }

  async getTaskRowByTitle(table: 'all' | 'completed' | 'today', title: string) {
    return this.page.locator(`tr`).filter({ has: this.page.getByRole('cell', { name: title }) }).first();
  }

  async completeTask(title: string) {
    const row = await this.getTaskRowByTitle('all', title);
    await row.locator('input[type="checkbox"]').first().click();
  }

  async deleteTask(title: string) {
    const row = await this.getTaskRowByTitle('all', title);
    await row.locator('button', { hasText: 'Delete' }).click();
  }
}

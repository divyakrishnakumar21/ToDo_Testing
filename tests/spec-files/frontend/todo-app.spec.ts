import { test, expect } from '@playwright/test';
import { TodoAppPage } from '../../pages/TodoAppPage';

test.describe('Todo App E2E', () => {
  test('should add a new task and display it', async ({ page }) => {
    const todoApp = new TodoAppPage(page);
    await todoApp.goto();
    await todoApp.addTask('Playwright Task', 'End to end test');
    await expect(await todoApp.getTaskTitleCell('all', 'Playwright Task')).toBeVisible();
  });

  test('should complete a task', async ({ page }) => {
    const todoApp = new TodoAppPage(page);
    await todoApp.goto();
    await todoApp.addTask('Complete Me', 'Mark as done');
    await todoApp.completeTask('Complete Me');
    await expect(page.locator("tr[data-testid='task-row-Complete-Me']")).toHaveCount(0, { timeout: 7000 });
    await page.getByText('Click here for completed tasks').click();
    await expect(await todoApp.getTaskTitleCell('completed', 'Complete Me')).toBeVisible({ timeout: 7000 });
  });

  test('should delete a task', async ({ page }) => {
    const todoApp = new TodoAppPage(page);
    await todoApp.goto();
    await todoApp.addTask('Delete Me', 'Remove this task');
    await todoApp.deleteTask('Delete Me');
    await expect(page.locator("tr[data-testid='task-row-Delete-Me']")).toHaveCount(0, { timeout: 7000 });
  });
});

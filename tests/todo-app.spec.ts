import { test, expect } from '@playwright/test';
import { TodoAppPage } from './pages/TodoAppPage';

test.describe('Todo App E2E', () => {
  test('should add a new task and display it', async ({ page }) => {
    const todoApp = new TodoAppPage(page);
    await todoApp.goto();
    await todoApp.addTask('Playwright Task', 'End to end test');
  await expect(await todoApp.getTaskTitleCell('Playwright Task')).toBeVisible();
  });

  test('should complete a task', async ({ page }) => {
    const todoApp = new TodoAppPage(page);
    await todoApp.goto();
    await todoApp.addTask('Complete Me', 'Mark as done');
    await todoApp.completeTask('Complete Me');
    // You can add more assertions here
  });

  test('should delete a task', async ({ page }) => {
    const todoApp = new TodoAppPage(page);
    await todoApp.goto();
    await todoApp.addTask('Delete Me', 'Remove this task');
    await todoApp.deleteTask('Delete Me');
  await expect(await todoApp.getTaskTitleCell('Delete Me')).not.toBeVisible();
  });
});

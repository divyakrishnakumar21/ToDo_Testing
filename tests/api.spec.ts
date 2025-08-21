import { test, expect, request } from '@playwright/test';
import { createTask, getTasks, getTask, updateTask, deleteTask } from './helper';

test.describe('API Tests for Tasks', () => {
  test('should create, fetch, update, and delete a task', async () => {
    const api = await request.newContext();
    // Create
    const newTask = await createTask(api, { title: 'API Test Task', description: 'Created via API', completed: false });
    expect(newTask.title).toBe('API Test Task');
    // Fetch all
    const allTasks = await getTasks(api);
    expect(Array.isArray(allTasks)).toBeTruthy();
    // Fetch single
    const fetched = await getTask(api, newTask.id);
    expect(fetched.title).toBe('API Test Task');
    // Update
    const updated = await updateTask(api, newTask.id, { ...newTask, title: 'API Updated Task' });
    expect(updated.title).toBe('API Updated Task');
    // Delete
    const delRes = await deleteTask(api, newTask.id);
    expect(delRes.ok()).toBeTruthy();
    // Confirm deletion
    const afterDelete = await getTasks(api);
    expect(afterDelete.find((t: any) => t.id === newTask.id)).toBeFalsy();
    await api.dispose();
  });
});

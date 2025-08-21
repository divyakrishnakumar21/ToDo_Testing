import { APIRequestContext, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

export async function createTask(request: APIRequestContext, data: { title: string; description?: string; dueDate?: string; completed?: boolean }) {
  const response = await request.post(`${BASE_URL}/tasks`, {
    data,
  });
  expect(response.ok()).toBeTruthy();
  return await response.json();
}

export async function getTasks(request: APIRequestContext) {
  const response = await request.get(`${BASE_URL}/tasks`);
  expect(response.ok()).toBeTruthy();
  return await response.json();
}

export async function getTask(request: APIRequestContext, id: string) {
  const response = await request.get(`${BASE_URL}/tasks/${id}`);
  expect(response.ok()).toBeTruthy();
  return await response.json();
}

export async function updateTask(request: APIRequestContext, id: string, data: any) {
  const response = await request.put(`${BASE_URL}/tasks/${id}`, {
    data,
  });
  expect(response.ok()).toBeTruthy();
  return await response.json();
}

export async function deleteTask(request: APIRequestContext, id: string) {
  const response = await request.delete(`${BASE_URL}/tasks/${id}`);
  expect(response.ok()).toBeTruthy();
  return response;
}

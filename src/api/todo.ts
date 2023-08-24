import { $http } from "./http";
import { TodoItemType } from "../types/todo";

const BASE_URL = "/todo";

export async function getTodos() {
  const endpoint = BASE_URL;
  return await $http.get(endpoint);
}

export async function setIsChecked(id: number, isDone: boolean) {
  const endpoint = BASE_URL;
  const body = { id, isDone };
  return await $http.put(endpoint, body);
}

export async function addTodoItem(text: string) {
  const endpoint = BASE_URL;
  const body = { text };
  return await $http.post(endpoint, body);
}

export async function deleteTodoItem(id: number) {
  const endpoint = BASE_URL;
  return await $http.delete(endpoint, { params: { id } });
}

export async function deleteDoneTodoItems(ids: number[]) {
  const endpoint = `${BASE_URL}/delete-done`;
  return await $http.delete(endpoint);
}

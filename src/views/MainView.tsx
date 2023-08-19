import TodoItem from "../components/todo/TodoItem";
import React, { KeyboardEventHandler, useEffect, useState } from "react";
import { TodoItemType } from "../types/todo";
import api from "../api";

export default function MainView() {
  const [todoItems, setTodoItems] = useState<TodoItemType[]>([]);
  const [todoInput, setTodoInput] = useState("");

  const addNewTodoItem = async () => {
    if (!todoInput.length) return;

    const response = await api.addTodoItem(todoInput);
    if (response.success) {
      setTodoInput("");
      setTodoItems(response.data);
    }
  };

  const deleteTodoItem = async (item: TodoItemType) => {
    const response = await api.deleteTodoItem(item.id);
    if (response.success) {
      setTodoItems(response.data);
    }
  };

  const onTodoInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key.toLowerCase() === "enter") {
      addNewTodoItem();
    }
  };

  useEffect(() => {
    api.getTodos().then((response) => {
      if (response.success) {
        setTodoItems(response.data);
      }
    });
  }, []);

  return (
    <div className="main-view">
      <h1>Hello World</h1>

      {todoItems.map((todoItem) => (
        <TodoItem
          key={todoItem.id}
          item={todoItem}
          onDeleteClick={deleteTodoItem}
        />
      ))}

      <div className="todo-item-input-container">
        <input
          className="todo-item-input"
          type="text"
          placeholder="Enter new todo item"
          value={todoInput}
          onKeyDown={onTodoInputKeyDown}
          onInput={(e) => setTodoInput((e.target as HTMLInputElement).value)}
        />
        <button className="todo-item-add" onClick={addNewTodoItem}>
          Add
        </button>
      </div>
    </div>
  );
}

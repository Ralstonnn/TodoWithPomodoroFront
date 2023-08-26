import TodoItem from "../components/todo/TodoItem";
import React, { useEffect, useState } from "react";
import { TodoItemType } from "../types/todo";
import api from "../api";
import Container from "../components/common/Container";

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

  const onItemCheckClick = async (index: number) => {
    const { id: itemId, isDone: itemIsDone } = todoItems[index];
    const response = await api.setIsChecked(itemId, !itemIsDone);
    if (response.success) {
      setTodoItems((prevValue) =>
        prevValue.map((item) => {
          if (item.id === itemId)
            return { ...item, isDone: response.data.value };
          return item;
        })
      );
    }
  };

  const onDeleteDoneClick = async () => {
    const doneItemsIds = todoItems.reduce((acc, item) => {
      if (item.isDone) acc.push(item.id);
      return acc;
    }, [] as number[]);
    const response = await api.deleteDoneTodoItems(doneItemsIds);
    if (response.success) {
      setTodoItems(response.data);
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
    <Container>
      <div className="main-view">
        <h1>Hello World</h1>
        <button type="button" onClick={onDeleteDoneClick}>
          DeleteAllChecked
        </button>

        {todoItems.map((todoItem, index) => (
          <TodoItem
            key={todoItem.id}
            item={todoItem}
            onDeleteClick={deleteTodoItem}
            onCheckClick={() => onItemCheckClick(index)}
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
    </Container>
  );
}

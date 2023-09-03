import "../../style/layout/todo-layout.scss";
import TodoItem from "../todo/TodoItem";
import React, { useEffect, useState } from "react";
import { TodoItemType } from "../../types/todo";
import api from "../../api";
import ComponentOverlayPreloader from "../common/ComponentOverlayPreloader";
import TodoItemsFilters from "../todo/TodoItemsFilters";

export default function TodoLayout() {
  const [todoItems, setTodoItems] = useState<TodoItemType[]>([]);
  const [todoInput, setTodoInput] = useState("");
  const [todoLoading, setTodoLoading] = useState(false);

  const addNewTodoItem = async () => {
    if (!todoInput.length) return;

    setTodoLoading(true);
    const response = await api.todo.addTodoItem(todoInput);
    if (response.success) {
      setTodoInput("");
      setTodoItems(response.data);
    }
    setTodoLoading(false);
  };

  const deleteTodoItem = async (item: TodoItemType) => {
    setTodoLoading(true);
    const response = await api.todo.deleteTodoItem(item.id);
    if (response.success) {
      setTodoItems(response.data);
    }
    setTodoLoading(false);
  };

  const onTodoInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key.toLowerCase() === "enter") {
      addNewTodoItem();
    }
  };

  const onItemCheckClick = async (index: number) => {
    setTodoLoading(true);
    const { id: itemId, isDone: itemIsDone } = todoItems[index];
    const response = await api.todo.setIsChecked(itemId, !itemIsDone);
    if (response.success) {
      setTodoItems((prevValue) =>
        prevValue.map((item) => {
          if (item.id === itemId)
            return { ...item, isDone: response.data.value };
          return item;
        })
      );
    }
    setTodoLoading(false);
  };

  const onDeleteDoneClick = async () => {
    setTodoLoading(true);
    const doneItemsIds = todoItems.reduce((acc, item) => {
      if (item.isDone) acc.push(item.id);
      return acc;
    }, [] as number[]);
    const response = await api.todo.deleteDoneTodoItems(doneItemsIds);
    if (response.success) {
      setTodoItems(response.data);
    }
    setTodoLoading(false);
  };

  useEffect(() => {
    setTodoLoading(true);
    api.todo
      .getTodos()
      .then((response) => {
        if (response.success) {
          setTodoItems(response.data);
        }
      })
      .finally(() => {
        setTodoLoading(false);
      });
  }, []);

  return (
    <div className="todo-layout">
      <TodoItemsFilters onDeleteDoneClick={onDeleteDoneClick} />

      <div
        className={`todo-items-container ${
          todoLoading && !todoItems?.length ? "loading" : ""
        }`}
      >
        {todoItems.map((todoItem, index) => (
          <TodoItem
            key={todoItem.id}
            item={todoItem}
            onDeleteClick={deleteTodoItem}
            onCheckClick={() => onItemCheckClick(index)}
          />
        ))}
        {todoLoading && <ComponentOverlayPreloader />}

        <div className="todo-items-input-container">
          <input
            className="todo-items-input"
            type="text"
            placeholder="Enter new todo item"
            value={todoInput}
            disabled={todoLoading}
            onKeyDown={onTodoInputKeyDown}
            onInput={(e) => setTodoInput((e.target as HTMLInputElement).value)}
          />
          {/*<button*/}
          {/*  className="todo-items-add"*/}
          {/*  disabled={todoLoading}*/}
          {/*  onClick={addNewTodoItem}*/}
          {/*>*/}
          {/*  Add*/}
          {/*</button>*/}
        </div>
      </div>
    </div>
  );
}

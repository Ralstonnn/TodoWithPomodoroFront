import "../../style/todo/todo-item.scss";
import { TodoItemType } from "../../types/todo";
import React, { useState } from "react";
import api from "../../api";

type Props = {
  item: TodoItemType;
  onDeleteClick: Function;
};

export default function TodoItem({ item, onDeleteClick }: Props) {
  const [isDone, setIsDone] = useState(item.isDone);
  const [isHovered, setIsHovered] = useState(false);
  const onCheck = async () => {
    const response = await api.setIsChecked(item.id, !isDone);
    if (response.success) setIsDone(response.data.value);
  };

  return (
    <div
      className="todo-item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <input type="checkbox" checked={isDone} onChange={onCheck} />
      <span>{item.text}</span>
      <button
        className={`delete-btn ${!isHovered ? "hide" : ""}`}
        onClick={() => onDeleteClick(item)}
      />
    </div>
  );
}

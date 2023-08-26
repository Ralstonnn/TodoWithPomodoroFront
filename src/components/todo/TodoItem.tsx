import "../../style/todo/todo-item.scss";
import { TodoItemType } from "../../types/todo";
import { useState } from "react";
import CloseButton from "../common/CloseButton";

type Props = {
  item: TodoItemType;
  onDeleteClick: Function;
  onCheckClick: Function;
};

export default function TodoItem({ item, onDeleteClick, onCheckClick }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const onCheck = async () => {
    // if (response.success) setIsDone(response.data.value);
  };

  return (
    <div
      className="todo-item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <input
        type="checkbox"
        checked={item.isDone}
        onChange={() => onCheckClick()}
      />
      <span className={`todo-item-text ${item.isDone ? "cross-out" : ""}`}>
        {item.text}
      </span>
      <CloseButton
        className={!isHovered ? "hide" : ""}
        onClick={() => onDeleteClick(item)}
      />
    </div>
  );
}

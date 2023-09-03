import React from "react";
import "../../style/todo/todo-items-filters.scss";

type Props = {
  onDeleteDoneClick: Function;
};

export default function TodoItemsFilters({ onDeleteDoneClick }: Props) {
  return (
    <div className="todo-items__filters">
      <button
        className="todo-items__filters-button"
        type="button"
        onClick={() => onDeleteDoneClick()}
      >
        DeleteAllChecked
      </button>
    </div>
  );
}

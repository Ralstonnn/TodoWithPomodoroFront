import React from "react";
import "../../style/common/close-button.scss";

type Props = {
  className?: string;
  onClick: Function;
};

export default function CloseButton({ className, onClick }: Props) {
  return (
    <button
      className={`close-button-component ${className ?? ""}`}
      type="button"
      onClick={() => onClick()}
    />
  );
}

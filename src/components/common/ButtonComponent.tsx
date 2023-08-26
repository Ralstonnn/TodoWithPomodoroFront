import "../../style/common/button-component.scss";
import { ReactNode } from "react";

type Props = {
  type?: "submit" | "button";
  text?: string;
  onClick?: Function;
};

export default function ButtonComponent({
  type = "button",
  text = "",
  onClick,
}: Props) {
  return (
    <div className="button-component">
      <button type={type} onClick={() => (onClick ? onClick() : null)}>
        {text}
      </button>
    </div>
  );
}

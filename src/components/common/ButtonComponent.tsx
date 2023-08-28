import "../../style/common/button-component.scss";

type Props = {
  type?: "submit" | "button";
  text?: string;
  disabled?: boolean;
  onClick?: Function;
};

export default function ButtonComponent({
  type = "button",
  text = "",
  disabled = false,
  onClick,
}: Props) {
  return (
    <div className="button-component">
      <button
        type={type}
        onClick={() => (onClick ? onClick() : null)}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
}

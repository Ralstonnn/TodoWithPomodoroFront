import "../../style/common/text-input-component.scss";

type Props = {
  type?: "text" | "email" | "password";
  placeholder?: string;
  disabled?: boolean;
  value: string;
  onInput: Function;
};

export default function TextInputComponent({
  type = "text",
  placeholder,
  disabled = false,
  value,
  onInput,
}: Props) {
  return (
    <input
      className="text-input-component"
      type={type}
      placeholder={placeholder}
      value={value}
      onInput={(e) => onInput(e)}
      disabled={disabled}
    />
  );
}

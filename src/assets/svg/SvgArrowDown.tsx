type Props = {
  className: string;
};

export default function SvgArrowDown({ className }: Props) {
  return (
    <svg
      className={className}
      width="12"
      height="8"
      viewBox="0 0 12 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 1L6 6L11 1" stroke="black" stroke-width="2" />
    </svg>
  );
}

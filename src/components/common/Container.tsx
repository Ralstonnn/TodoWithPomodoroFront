import "../../style/common/container-component.scss";

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export default function Container({ children }: Props) {
  return <div className="container-component">{children}</div>;
}

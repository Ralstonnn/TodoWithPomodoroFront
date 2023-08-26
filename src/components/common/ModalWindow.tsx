import "../../style/common/modal-window.scss";
import React from "react";
import CloseButton from "./CloseButton";

type Props = {
  onCloseClick?: Function;
  children?: React.ReactNode | React.ReactNode[];
};

export default function ModalWindow({ onCloseClick, children }: Props) {
  const onCloseButtonClick = () => {
    if (onCloseClick) onCloseClick();
  };

  return (
    <div className="modal-window-component">
      <div className="modal-window-content">
        <CloseButton
          className={"modal-window-close-btn"}
          onClick={onCloseButtonClick}
        />
        {children}
      </div>
    </div>
  );
}

import React, { FunctionComponent, MouseEvent } from "react";
import styles from "./modal-overlay.module.css";

interface IModalOverlayProps {
  closeHandler: () => void;
}

const ModalOverlay: FunctionComponent<IModalOverlayProps> = ({
  closeHandler,
}) => {
  const overlay = React.useRef<HTMLDivElement>(null);

  const closeModalOnClick = (evt: MouseEvent<HTMLElement>) => {
    if (evt.target === overlay.current) {
      closeHandler();
    }
  };

  return (
    <div
      className={styles.overlay}
      ref={overlay}
      onClick={closeModalOnClick}
    ></div>
  );
};

export default ModalOverlay;

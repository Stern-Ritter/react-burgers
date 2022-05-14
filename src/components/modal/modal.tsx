import React, { useEffect, FunctionComponent } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";

const modal = document.getElementById("react-modals") as HTMLElement;

interface IModalProps {
  title?: string;
  closeHandler: () => void;
}

const Modal: FunctionComponent<IModalProps> = ({
  title,
  closeHandler,
  children,
}) => {

  const closeModalOnEsc = (evt: KeyboardEvent) => {
    if (evt.key === "Escape") {
      closeHandler();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", closeModalOnEsc);
    return () => {
      document.removeEventListener("keydown", closeModalOnEsc);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        {title && (
          <h2
            className={
              styles.title + " text text_type_main-large pl-10 pr-10 pt-10 pb-3"
            }
          >
            {title}
          </h2>
        )}
        <button
          className={styles.close}
          type="button"
          title="Закрыть"
          onClick={closeHandler}
        >
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
      <ModalOverlay closeHandler={closeHandler}></ModalOverlay>
    </>,
    modal
  );
};

export default Modal;

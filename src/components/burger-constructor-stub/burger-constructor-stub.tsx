import React, { FunctionComponent } from "react";
import { ConnectDropTarget } from "react-dnd";
import styles from "./burger-constructor-stub.module.css";

interface IBurgerConstructorStubProps {
  isHover: boolean;
  dropTarget: ConnectDropTarget;
}

const BurgerConstructorStub: FunctionComponent<IBurgerConstructorStubProps> = ({
  isHover,
  dropTarget,
}) => {
  const containerClass = `${styles.constructor} ${
    isHover ? styles.onHover : ""
  }`;

  return (
    <div className={containerClass} ref={dropTarget}>
      <p className={styles.text + " text text_type_main-default mb-2"}>
        Пренесите в эту область выбранные ингредиенты.
      </p>
    </div>
  );
};

export default BurgerConstructorStub;

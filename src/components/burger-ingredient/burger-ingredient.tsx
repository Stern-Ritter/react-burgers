import React, { FunctionComponent } from "react";
import { useDrag } from "react-dnd";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";

interface IBurgerIngredientProps {
  ingredient: TIngredient;
  count: number;
  openHandler: (id: string) => void;
}

const BurgerIngredient: FunctionComponent<IBurgerIngredientProps> = ({
  ingredient,
  count,
  openHandler,
}) => {
  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: { id: ingredient._id, type: ingredient.type },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return !isDrag ? (
    <li
      ref={dragRef}
      className={styles.ingredient}
      onClick={() => openHandler(ingredient._id)}
    >
      <img
        className={styles.image + " pl-4 pr-4 mb-1"}
        alt={ingredient.name}
        src={ingredient.image}
      />
      <div className={styles.price + " mb-2"}>
        <p className="text text_type_digits-default mr-2">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default mb-6">{ingredient.name}</p>
      {count && <Counter count={count} size="default" />}
    </li>
  ) : null;
};

export default BurgerIngredient;

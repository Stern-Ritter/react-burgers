import React, { useRef, FunctionComponent } from "react";
import { useDispatch } from "../../types";;
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { SHIFT_INGREDIENT } from "../../services/actions/burger-constructor";
import styles from "./burger-constructor-item.module.css";

interface IBurgerConstructorItemProps {
  ingredient: TIngredient;
  idx: number;
  handleClose: (idx: number) => void;
}

const BurgerConstructorItem: FunctionComponent<IBurgerConstructorItemProps> = ({
  ingredient,
  idx,
  handleClose,
}) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLLIElement>(null);

  const [, dragRef] = useDrag({
    type: "shiftedIngredient",
    item: { idx },
  });

  const [, dropRef] = useDrop({
    accept: "shiftedIngredient",
    hover: (item, monitor: DropTargetMonitor<{idx: number}, HTMLLIElement>) => {
      const fromIndex = item.idx;
      const toIndex = idx;
      const dragElementPointerY = monitor.getClientOffset()?.y || 0;
      const dropElementCoords = ref.current?.getBoundingClientRect() as DOMRect;
      const dropElementCenterY =
        (dropElementCoords.top + dropElementCoords.bottom) / 2;

      if (
        (fromIndex < toIndex && dragElementPointerY > dropElementCenterY) ||
        (fromIndex > toIndex && dragElementPointerY < dropElementCenterY)
      ) {
        dispatch({ type: SHIFT_INGREDIENT, fromIndex, toIndex });
        item.idx = toIndex;
      }
    },
  });

  dropRef(dragRef(ref));

  return (
    <li ref={ref} className={styles.ingredient + " pl-2 pr-2"}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        handleClose={() => handleClose(idx)}
        thumbnail={ingredient.image}
      />
    </li>
  );
};

export default BurgerConstructorItem;

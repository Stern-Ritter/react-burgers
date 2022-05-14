import React, { useMemo, FunctionComponent } from "react";
import { useSelector } from "../../types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { statuses } from "../../utils/constants";
import toDateString from "../../utils/toDateString";
import styles from "./order.module.css";

interface IOrderProps {
  order: TOrder;
  type: string;
  clickHandler: (_id: string) => void;
}

const Order: FunctionComponent<IOrderProps> = ({
  order,
  type,
  clickHandler,
}) => {
  const { _id, number, name, createdAt, status, ingredients } = order;

  const ingredientsData = useSelector((store) => store.ingredients.data);

  const date = toDateString(createdAt);
  const displayedStatus = statuses[status];

  function notUndefined<TValue>(value: TValue | undefined): value is TValue {
    return value !== undefined;
  }

  const mappedIngredients = useMemo(
    () =>
      ingredients.length && ingredientsData.length
        ? Object.values(
            ingredients
              .map((ingredient) => {
                return ingredientsData.find(
                  (element) => element._id === ingredient
                );
              })
              .filter(notUndefined)
              .reduce((accIngredients, current) => {
                accIngredients[current.name] = accIngredients[current.name]
                  ? {
                      ...accIngredients[current.name],
                      count: accIngredients[current.name].count + 1,
                    }
                  : { ...current, count: 1 };
                return accIngredients;
              }, {} as Record<string, TIngredient & { count: number}>)
          ).sort((ingredient) => (ingredient.type === "bun" ? -1 : 1))
        : [],
    [ingredients, ingredientsData]
  );

  const amount = useMemo(() => {
    return mappedIngredients.reduce(
      (sum, current) => (sum += current.count * current.price),
      0
    );
  }, [mappedIngredients]);

  const limitExceeding = useMemo(
    () => mappedIngredients.length - 6,
    [mappedIngredients]
  );

  const limitedIngredients = useMemo(
    () => mappedIngredients.slice(0, 6),
    [mappedIngredients]
  );

  const nameStyles = `text text_type_main-medium ${
    type === "enhanced" ? " mb-2" : " mb-6"
  }`;

  const statusStyles = `text text_type_main-default mb-6 ${
    status === "done" ? styles.done : ""
  }`;

  return (
    <div className={styles.order + " p-6"} onClick={() => clickHandler(_id)}>
      <div className={styles.row + " mb-6"}>
        <p className="text text_type_digits-default">{`#${number}`}</p>
        <p className="text text_type_main-default text_color_inactive">
          {date}
        </p>
      </div>

      <h3 className={nameStyles}>{name}</h3>
      {type === "enhanced" && <p className={statusStyles}>{displayedStatus}</p>}

      <div className={styles.row}>
        <ul className={styles.ingredients}>
          {limitedIngredients.map((ingredient, idx) => (
            <li
              key={idx}
              className={styles.item}
              style={{
                zIndex: ingredients.length - idx,
              }}
            >
              <div className={styles["ingredient-holder"]}>
                <img
                  src={ingredient.image_mobile}
                  alt={ingredient.name}
                  className={styles.ingredient}
                  style={{
                    opacity: idx === 5 && limitExceeding > 0 ? 0.6 : 1,
                  }}
                />
              </div>
              {idx === 5 && limitExceeding > 0 && (
                <span
                  className={styles.counter + " text text_type_main-default"}
                >{`+${limitExceeding}`}</span>
              )}
            </li>
          ))}
        </ul>
        <div className={styles.row}>
          <p className="text text_type_digits-default mr-2">{amount}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default Order;

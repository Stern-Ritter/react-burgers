import React, { useMemo, FunctionComponent } from "react";
import { useSelector } from "../../types";
import { useParams } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { statuses } from "../../utils/constants";
import toDateString from "../../utils/toDateString";
import styles from "./order-info.module.css";

interface IOrderInfoProps {
  orders: Array<TOrder>;
  type?: string;
}

interface IOrderInfoParams {
  id: string;
}

const OrderInfo: FunctionComponent<IOrderInfoProps> = ({ orders, type }) => {
  const { id } = useParams<IOrderInfoParams>();

  const ingredientsData = useSelector((store) => store.ingredients.data);

  const selectedOrder = useMemo(() => {
    return orders.find((order) => order._id === id);
  }, [id, orders]);

  const date = selectedOrder && toDateString(selectedOrder.createdAt);
  const displayedStatus = selectedOrder && statuses[selectedOrder.status];

  function notUndefined<TValue>(value: TValue | undefined): value is TValue {
    return value !== undefined;
  }

  const mappedIngredients = useMemo(
    () =>
      selectedOrder
        ? Object.values(
            selectedOrder.ingredients
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
              }, {} as Record<string, TIngredient & { count : number }>)
          ).sort((ingredient) => (ingredient.type === "bun" ? -1 : 1))
        : [],
    [selectedOrder, ingredientsData]
  );

  const amount = useMemo(() => {
    return mappedIngredients.reduce(
      (sum, current) => (sum += current.count * current.price),
      0
    );
  }, [mappedIngredients]);

  return selectedOrder ? (
    <div className={styles.container}>
      <p
        className={
          " text text_type_digits-default mb-10 " +
          (type === "modal" ? "" : styles.number)
        }
      >{`#${selectedOrder.number}`}</p>
      <p className="text text_type_main-medium mb-3">{selectedOrder.name}</p>
      <p
        className={
          " text text_type_main-default mb-15 " +
          (selectedOrder.status === "done" ? styles.done : "")
        }
      >
        {displayedStatus}
      </p>
      <p className="text text_type_main-medium">Состав:</p>
      <ul className={styles.list}>
        {mappedIngredients.map((ingredient, idx) => (
          <li key={idx} className={styles.item}>
            <div className={styles["image-background"] + " mr-4"}>
              <div className={styles["image-wrapper"]}>
                <img
                  src={ingredient.image}
                  alt={ingredient.name}
                  className={styles.image}
                />
              </div>
            </div>

            <p className={styles.name + " text text_type_main-default mr-4"}>
              {ingredient.name}
            </p>

            <div className={styles.row}>
              <p className="text text_type_digits-default mr-2">
                {`${ingredient.count} x ${ingredient.price}`}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.row}>
        <p className="text text_type_main-default text_color_inactive">
          {date}
        </p>
        <div className={styles.row}>
          <p className="text text_type_digits-default mr-2">{amount}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  ) : null;
};

export default OrderInfo;

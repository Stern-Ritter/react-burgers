import React, { useMemo } from "react";
import { useSelector } from "../../types";
import { maxOrdersStatusCount } from "../../utils/constants";
import styles from "./orders-status.module.css";

const OrdersStatus = () => {
  const orders = useSelector((store) => store.allOrders.orders);
  const total = useSelector((store) => store.allOrders.total);
  const totalToday = useSelector((store) => store.allOrders.totalToday);

  const toDoOrders = useMemo(
    () =>
      orders
        .filter((order) => order.status !== "done")
        .slice(-maxOrdersStatusCount),
    [orders]
  );

  const doneOrders = useMemo(
    () =>
      orders
        .filter((order) => order.status === "done")
        .slice(-maxOrdersStatusCount),
    [orders]
  );

  return (
    <div>
      <div className={styles.lists + " mb-15"}>
        <div className={styles["list-container"]}>
          <p className="text text_type_main-medium pb-6">Готовы:</p>
          <ul className={`${styles.list} ${styles.done}`}>
            {doneOrders.map(({ _id, number }) => (
              <li key={_id} className="text text_type_digits-default">
                {number}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles["list-container"]}>
          <p className="text text_type_main-medium pb-6">В работе:</p>
          <ul className={styles.list}>
            {toDoOrders.map(({ _id, number }) => (
              <li key={_id} className="text text_type_digits-default">
                {number}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text text_type_main-medium">Выполнено за все время:</p>
      <p className={styles.counter + " text text_type_digits-large mb-15"}>
        {total}
      </p>

      <p className="text text_type_main-medium">Выполнено за сегодня:</p>
      <p className={styles.counter + " text text_type_digits-large"}>
        {totalToday}
      </p>
    </div>
  );
}

export default OrdersStatus;

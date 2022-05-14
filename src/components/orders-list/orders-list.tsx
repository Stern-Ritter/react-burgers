import React, { FunctionComponent } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Order from "../order/order";
import styles from "./orders-list.module.css";

interface IOrdersListProps {
  orders: Array<TOrder>;
  type: string;
  path: string;
}

const OrdersList: FunctionComponent<IOrdersListProps> = ({
  orders,
  type,
  path,
}) => {
  const location = useLocation();
  const history = useHistory();

  const clickHandler = (id: string) => {
    history.push({ pathname: `${path}/${id}`, state: { order: location } });
  };

  return (
    <ul className={styles.list}>
      {orders.map((order) => (
        <li key={order._id} className={type === "simple" ? "mb-4" : "mb-6"}>
          <Order type={type} clickHandler={clickHandler} order={order} />
        </li>
      ))}
    </ul>
  );
};

export default OrdersList;

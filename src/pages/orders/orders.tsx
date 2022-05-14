import React, { useEffect } from "react";
import { Location } from "history";
import { useDispatch, useSelector } from "../../types";
import {
  Switch,
  Route,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import OrdersList from "../../components/orders-list/orders-list";
import OrdersStatus from "../../components/orders-status/orders-status";
import OrderInfo from "../../components/order-info/order-info";
import Modal from "../../components/modal/modal";
import Loader from "../../components/loader/loader";
import {
  wsAllOrdersConnectionStart,
  wsAllOrdersConnectionClosing,
} from "../../services/actions/all-orders";
import styles from "./orders.module.css";

interface IOrdersLocation {
  order: Location;
}

const Orders = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<IOrdersLocation>();
  const { path } = useRouteMatch();

  useEffect(() => {
    dispatch(wsAllOrdersConnectionStart());

    return () => {
      dispatch(wsAllOrdersConnectionClosing());
    };
  }, []);

  const connected = useSelector((store) => store.allOrders.wsConnected);
  const orders = useSelector((store) => store.allOrders.orders);

  const closeHandler = () => {
    history.goBack();
  };

  const order = location.state && location.state.order;

  return connected ? (
    <>
      <Switch location={order || location}>
        <Route path={path} exact>
          <div className={styles["orders-container"]}>
            <h1 className={styles.title + " text text_type_main-large"}>
              Лента заказов
            </h1>
            <div className={styles.orders}>
              <OrdersList orders={orders} type={"simple"} path={path} />
              <OrdersStatus />
            </div>
          </div>
        </Route>

        <Route path={`${path}/:id`} exact>
          <div className={styles["order-container"]}>
            <OrderInfo orders={orders} />
          </div>
        </Route>
      </Switch>

      {order && (
        <Route path={`${path}/:id`} exact>
          <Modal closeHandler={closeHandler}>
            <div className={styles["modal-container"]}>
              <OrderInfo orders={orders} type="modal" />
            </div>
          </Modal>
        </Route>
      )}
    </>
  ) : (
    <div className={styles["loader-container"]}>
      <Loader />
    </div>
  );
};

export default Orders;

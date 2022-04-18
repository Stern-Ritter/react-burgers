import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Switch,
  Route,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import ProfileNavigation from "../../components/profile-navigation/profile-navigation";
import ProfileForm from "../../components/profile-form/profile-form";
import OrdersList from "../../components/orders-list/orders-list";
import OrderInfo from "../../components/order-info/order-info";
import Modal from "../../components/modal/modal";
import Loader from "../../components/loader/loader";
import {
  wsUserOrdersConnectionStart,
  wsUserOrdersConnectionClosing,
} from "../../services/actions/user-orders";
import { getCookie } from "../../utils/cookies";
import { accessTokenKey } from "../../utils/constants";
import styles from "./profile.module.css";

function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { state } = useLocation();
  const { path } = useRouteMatch();

  const user = useSelector((store) => store.user.data);

  useEffect(() => {
    if (user.name && user.email) {
      const token = getCookie(accessTokenKey);
      dispatch(wsUserOrdersConnectionStart(token));

      return () => {
        dispatch(wsUserOrdersConnectionClosing());
      };
    }
  }, [user]);

  const connected = useSelector((store) => store.userOrders.wsConnected);
  const orders = useSelector((store) => store.userOrders.orders);

  const closeHandler = () => {
    history.goBack();
  };

  return connected ? (
    <Switch>
      <Route path={path} exact>
        <div className={styles["profile-form-container"]}>
          <ProfileNavigation type={"form"}/>
          <ProfileForm />
        </div>
      </Route>
      <Route path={`${path}/orders`} exact>
        <div className={styles["orders-container"]}>
          <ProfileNavigation type={"orders"}/>
          <OrdersList orders={orders} type="enhanced" path={`${path}/orders`} />
        </div>
      </Route>

      <Route path={`${path}/orders/:id`} exact>
        {state?.type === "modal" ? (
          <Modal closeHandler={closeHandler}>
            <div className={styles["modal-container"]}>
              <OrderInfo orders={orders} type="modal" />
            </div>
          </Modal>
        ) : (
          <div className={styles["order-container"]}>
            <OrderInfo orders={orders} />
          </div>
        )}
      </Route>
    </Switch>
  ) : (
    <div className={styles["loader-container"]}>
      <Loader />
    </div>
  );
}

export default Profile;

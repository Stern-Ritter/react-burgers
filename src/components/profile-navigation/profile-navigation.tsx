import React, { FunctionComponent } from "react";
import { useDispatch } from "../../types";
import { useHistory, NavLink } from "react-router-dom";
import { logout } from "../../services/actions/user";
import styles from "./profile-navigation.module.css";

interface IProfileNavigationProps {
  type: string;
}

const ProfileNavigation: FunctionComponent<IProfileNavigationProps> = ({
  type,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const signOut = () => {
    dispatch(logout(history));
  };

  return (
    <div
      className={
        styles.container + ` mr-15 ${type === "orders" ? " pt-20" : ""}`
      }
    >
      <ul className={styles.links}>
        <li className={styles.item}>
          <NavLink
            to="/profile"
            exact
            className={
              styles.link + " text text_type_main-medium text_color_inactive"
            }
            activeClassName={styles.activeLink}
          >
            Профиль
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink
            to="/profile/orders"
            exact
            className={
              styles.link + " text text_type_main-medium text_color_inactive"
            }
            activeClassName={styles.activeLink}
          >
            История заказов
          </NavLink>
        </li>
        <li className={styles.item}>
          <button
            type="button"
            className={
              styles.button + " text text_type_main-medium text_color_inactive"
            }
            onClick={signOut}
          >
            Выход
          </button>
        </li>
      </ul>
      <p
        className={
          styles.description +
          " text text_type_main-default text_color_inactive"
        }
      >
        {type === "form" ? (
          <span>
            В&nbsp;этом разделе вы&nbsp;можете изменить&nbsp;свои персональные
            данные
          </span>
        ) : (
          <span>В этом разделе вы можете просмотреть свою историю заказов</span>
        )}
      </p>
    </div>
  );
};

export default ProfileNavigation;

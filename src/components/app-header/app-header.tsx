import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";

const AppHeader = () => {
  const { pathname } = useLocation();

  return (
    <header className={styles.header}>
      <nav className={styles.menu + " pt-4 pb-4"}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <NavLink
              to="/"
              exact
              className={
                styles.link +
                " text text_type_main-default text_color_inactive mr-2"
              }
              activeClassName={styles.activeLink}
            >
              <BurgerIcon type={pathname === "/" ? "primary" : "secondary"} />
              Конструктор
            </NavLink>
            <NavLink
              to="/feed"
              exact
              className={
                styles.link + " text text_type_main-default text_color_inactive"
              }
              activeClassName={styles.activeLink}
            >
              <ListIcon
                type={pathname === "/feed" ? "primary" : "secondary"}
              />
              Лента заказов
            </NavLink>
          </li>
          <li className={styles.logo}>
            <Logo />
          </li>
          <li className={styles.item}>
            <NavLink
              to="/profile"
              className={
                styles.link + " text text_type_main-default text_color_inactive"
              }
              activeClassName={styles.activeLink}
            >
              <ProfileIcon
                type={
                  pathname === "/profile" || pathname === "/profile/orders"
                    ? "primary"
                    : "secondary"
                }
              />
              Личный кабинет
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;

import React from "react";
import { Link } from 'react-router-dom';
import styles from "./not-found.module.css";

const NotFound = () => {
  return (
    <div className={styles.container}>
        <h1>Упс! Ошибка 404</h1>
        <p>Страница, которую вы запрашиваете, не существует</p>
        <p>
          проверьте адрес или перейдите на{" "}
          <Link to="/" className={styles.link}>
            Главную страницу
          </Link>
        </p>
    </div>
  );
}

export default NotFound;

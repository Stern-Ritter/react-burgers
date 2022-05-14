import React, { useEffect, FormEvent, ChangeEvent } from "react";
import { useDispatch, useSelector } from "../../types";
import { Link, Redirect } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  FORGOT_PASSWORD_FORM_CLEAR_STATE,
  setForgotPasswordFormValue,
  forgotPassword,
} from "../../services/actions/forgot-password";
import { getStorageItem } from "../../utils/storage";
import { refreshTokenKey } from "../../utils/constants";
import styles from "./forgot-password.module.css";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: FORGOT_PASSWORD_FORM_CLEAR_STATE });
  }, [dispatch]);

  const {
    data: { email },
    loading,
    success,
    hasError,
  } = useSelector((store) => store.forgotPasswordForm);

  const onFormChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const input = evt.target;
    dispatch(
      setForgotPasswordFormValue({ field: input.name, value: input.value })
    );
  };

  const onFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(forgotPassword({ email }));
  };

  if (getStorageItem(refreshTokenKey)) {
    return <Redirect to="/" />;
  }

  if (success) {
    return <Redirect to="/reset-password" />;
  }

  return (
    <form className={styles.form} onSubmit={onFormSubmit}>
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
      <Input
        type="email"
        placeholder="Укажите e-mail"
        name="email"
        value={email}
        onChange={onFormChange}
      />
      <Button type="primary" size="medium" disabled={loading}>
        Восстановить
      </Button>
      <div className="mt-20 mb-4">
        <span className="text text_type_main-default text_color_inactive mr-2">
          Вспомнили пароль?
        </span>
        <Link
          to="/login"
          className={styles.link + " text text_type_main-default"}
        >
          Войти
        </Link>
      </div>
    </form>
  );
}

export default ForgotPassword;

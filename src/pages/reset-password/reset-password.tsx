import React, { useEffect, FormEvent, ChangeEvent } from "react";
import { useDispatch, useSelector } from "../../types";
import { Link, Redirect } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  RESET_PASSWORD_FORM_CLEAR_STATE,
  setResetPasswordFormValue,
  resetPassword,
} from "../../services/actions/reset-password";
import { getStorageItem } from "../../utils/storage";
import { refreshTokenKey } from "../../utils/constants";
import styles from "./reset-password.module.css";

const ResetPassword = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: RESET_PASSWORD_FORM_CLEAR_STATE });
  }, [dispatch]);

  const {
    data: { password, token },
    loading,
    success,
    hasError,
  } = useSelector((store) => store.resetPasswordForm);
  const forgotPasswordSuccess = useSelector(
    (store) => store.forgotPasswordForm.success
  );

  const onFormChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const input = evt.target;
    dispatch(
      setResetPasswordFormValue({ field: input.name, value: input.value })
    );
  };

  const onFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(resetPassword({ password, token }));
  };

  if (getStorageItem(refreshTokenKey)) {
    return <Redirect to="/" />;
  }

  if (!forgotPasswordSuccess) {
    return <Redirect to="/forgot-password" />;
  }

  return (
    <form className={styles.form} onSubmit={onFormSubmit}>
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
      <Input
        type="password"
        placeholder="Введите новый пароль"
        name="password"
        icon="ShowIcon"
        value={password}
        onChange={onFormChange}
      />
      <Input
        type="text"
        placeholder="Введите код из письма"
        name="token"
        value={token}
        onChange={onFormChange}
      />
      <Button type="primary" size="medium" disabled={loading}>
        Сохранить
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

export default ResetPassword;

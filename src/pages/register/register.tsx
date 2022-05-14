import React, { useEffect, FormEvent, ChangeEvent } from "react";
import { useDispatch, useSelector } from "../../types";
import { Link, Redirect } from "react-router-dom";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  REGISTER_FORM_CLEAR_STATE,
  setRegisterFormValue,
  register,
} from "../../services/actions/register";
import { getStorageItem } from "../../utils/storage";
import { refreshTokenKey } from "../../utils/constants";
import styles from "./register.module.css";

const Register = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: REGISTER_FORM_CLEAR_STATE });
  }, [dispatch]);

  const {
    data: { name, email, password },
    loading,
    success,
    hasError,
  } = useSelector((store) => store.registerForm);

  const onFormChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const input = evt.target;
    dispatch(setRegisterFormValue({ field: input.name, value: input.value }));
  };

  const onFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(register({ email, password, name }));
  };

  if (getStorageItem(refreshTokenKey)) {
    return <Redirect to="/" />;
  }

  return (
    <form className={styles.form} onSubmit={onFormSubmit}>
      <h1 className="text text_type_main-medium mb-6">Регистрация</h1>

      <Input
        type="text"
        placeholder="Имя"
        name="name"
        value={name}
        onChange={onFormChange}
      />
      <Input
        type="email"
        placeholder="E-mail"
        name="email"
        value={email}
        onChange={onFormChange}
      />
      <PasswordInput name="password" value={password} onChange={onFormChange} />

      <Button type="primary" size="medium" disabled={loading}>
        Зарегистрироваться
      </Button>

      <div className="mt-20 mb-4">
        <span className="text text_type_main-default text_color_inactive mr-2">
          Уже зарегистрированы?
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

export default Register;

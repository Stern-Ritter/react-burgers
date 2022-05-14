import React, { useMemo, FormEvent, ChangeEvent } from "react";
import { useDispatch, useSelector } from "../../types";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  updateUser,
  setUpdateUserFormValue,
  UPDATE_USER_FORM_CLEAR_STATE,
} from "../../services/actions/user";
import styles from "./profile-form.module.css";

const ProfileForm = () => {
  const dispatch = useDispatch();

  const userData = useSelector((store) => store.user.data);
  const userForm = useSelector((store) => store.user.form);
  const updateUserRequest = useSelector(
    (store) => store.user.updateUserRequest
  );
  const updateUserRequestSuccess = useSelector(
    (store) => store.user.updateUserRequestSuccess
  );
  const updateUserRequestFailed = useSelector(
    (store) => store.user.updateUserRequestFailed
  );

  const isUserDataAndUserFormNotMatch = useMemo(() => {
    return (
      userData.name !== userForm.name ||
      userData.email !== userForm.email ||
      userForm.password !== ""
    );
  }, [userData, userForm]);

  const onFormChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const input = evt.target;
    dispatch(setUpdateUserFormValue({ field: input.name, value: input.value }));
  };

  const onFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(
      updateUser({
        name: userForm.name,
        email: userForm.email,
        password: userForm.password,
      })
    );
  };

  const onFormReset = () => {
    dispatch({ type: UPDATE_USER_FORM_CLEAR_STATE });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onFormSubmit}>
        <Input
          type="text"
          placeholder="Имя"
          name="name"
          icon="EditIcon"
          value={userForm.name}
          onChange={onFormChange}
        />
        <Input
          type="email"
          placeholder="Логин"
          name="email"
          icon="EditIcon"
          value={userForm.email}
          onChange={onFormChange}
        />
        <Input
          type="password"
          placeholder="Пароль"
          name="password"
          icon="EditIcon"
          value={userForm.password}
          onChange={onFormChange}
        />

        {isUserDataAndUserFormNotMatch && (
          <Button type="primary" size="medium" disabled={updateUserRequest}>
            Сохранить
          </Button>
        )}
      </form>

      {isUserDataAndUserFormNotMatch && (
        <Button
          type="primary"
          size="medium"
          disabled={updateUserRequest}
          onClick={onFormReset}
        >
          Отмена
        </Button>
      )}
    </div>
  );
}

export default ProfileForm;

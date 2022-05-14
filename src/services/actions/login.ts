import { loginRequest } from "../../utils/api";
import { setCookie, deleteCookie } from "../../utils/cookies";
import { setStorageItem } from "../../utils/storage";
import { accessTokenKey, refreshTokenKey } from "../../utils/constants";
import { AppDispatch, AppThunk } from "../../types";

export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const LOGIN_FORM_CLEAR_STATE = "LOGIN_FORM_CLEAR_STATE";
export const LOGIN_FORM__SET_VALUE = "LOGIN_FORM__SET_VALUE";

export interface ILogin {
  readonly type: typeof LOGIN;
}

export interface ILoginSuccess {
  readonly type: typeof LOGIN_SUCCESS;
}

export interface ILoginFailed {
  readonly type: typeof LOGIN_FAILED;
}

export interface ILoginFormClearState {
  readonly type: typeof LOGIN_FORM_CLEAR_STATE;
}

export interface ILoginFormSetValue {
  readonly type: typeof LOGIN_FORM__SET_VALUE;
  readonly payload: {
    readonly field: string;
    readonly value: string;
  };
}

export type TLoginActions =
  | ILogin
  | ILoginSuccess
  | ILoginFailed
  | ILoginFormClearState
  | ILoginFormSetValue;

export function setLoginFormValue({
  field,
  value,
}: {
  field: string;
  value: string;
}): ILoginFormSetValue {
  return {
    type: LOGIN_FORM__SET_VALUE,
    payload: { field, value },
  };
}

export const login: AppThunk = (form: TLoginForm) => {
  return async function (dispatch: AppDispatch) {
    dispatch({ type: LOGIN });
    try {
      const data = await loginRequest(form);

      if (data?.success && data?.accessToken && data?.refreshToken) {
        const accessToken = data.accessToken.split("Bearer ")[1];
        const refreshToken = data.refreshToken;
        deleteCookie(accessTokenKey);
        setCookie(accessTokenKey, accessToken);
        setStorageItem(refreshTokenKey, refreshToken);

        dispatch({ type: LOGIN_SUCCESS });
        dispatch({ type: LOGIN_FORM_CLEAR_STATE });
      } else {
        dispatch({ type: LOGIN_FAILED });
      }
    } catch (err) {
      dispatch({ type: LOGIN_FAILED });
    }
  };
}

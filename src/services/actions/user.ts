import { History } from "history";
import {
  getUserRequest,
  updateUserRequest,
  refreshTokenRequest,
  logoutRequest,
} from "../../utils/api";
import { getCookie, setCookie, deleteCookie } from "../../utils/cookies";
import {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
} from "../../utils/storage";
import { accessTokenKey, refreshTokenKey } from "../../utils/constants";
import { AppDispatch, AppThunk } from "../../types";

export const GET_USER = "GET_USER";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";

export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";
export const UPDATE_USER_FORM_SET_VALUE = "UPDATE_USER_FORM_SET_VALUE";
export const UPDATE_USER_FORM_CLEAR_STATE = "UPDATE_USER_FORM_CLEAR_STATE";

export const LOGOUT = "LOGOUT";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

export interface IGetUser {
  readonly type: typeof GET_USER;
}

export interface IGetUserSuccess {
  readonly type: typeof GET_USER_SUCCESS;
  readonly payload: Omit<TUpdateUserForm, "password">;
}

export interface IGetUserFailed {
  readonly type: typeof GET_USER_FAILED;
}

export interface IUpdateUser {
  readonly type: typeof UPDATE_USER;
}

export interface IUpdateUserSuccess {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly payload: Omit<TUpdateUserForm, "password">;
}

export interface IUpdateUserFailed {
  readonly type: typeof UPDATE_USER_FAILED;
}

export interface IUpdateUserFormSetValue {
  readonly type: typeof UPDATE_USER_FORM_SET_VALUE;
  readonly payload: {
    readonly field: string;
    readonly value: string;
  };
}

export interface IUpdateUserFormClearState {
  readonly type: typeof UPDATE_USER_FORM_CLEAR_STATE;
}

export interface ILogout {
  readonly type: typeof LOGOUT;
}

export interface ILogoutSuccess {
  readonly type: typeof LOGOUT_SUCCESS;
}

export interface ILogoutFailed {
  readonly type: typeof LOGOUT_FAILED;
}

export type TUserActions =
  | IGetUser
  | IGetUserSuccess
  | IGetUserFailed
  | IUpdateUser
  | IUpdateUserSuccess
  | IUpdateUserFailed
  | IUpdateUserFormSetValue
  | IUpdateUserFormClearState
  | ILogout
  | ILogoutSuccess
  | ILogoutFailed;

export function setUpdateUserFormValue({
  field,
  value,
}: {
  field: string;
  value: string;
}): IUpdateUserFormSetValue {
  return {
    type: UPDATE_USER_FORM_SET_VALUE,
    payload: { field, value },
  };
}

export async function refreshToken() {
  const token = getStorageItem(refreshTokenKey);
  const data = await refreshTokenRequest(token);
  if (data?.success && data?.accessToken && data?.refreshToken) {
    const accessToken = data.accessToken.split("Bearer ")[1];
    const refreshToken = data.refreshToken;
    deleteCookie(accessTokenKey);
    setCookie(accessTokenKey, accessToken);
    setStorageItem(refreshTokenKey, refreshToken);
  }
}

export const getUser: AppThunk = () => {
  return async function (dispatch: AppDispatch) {
    dispatch({ type: GET_USER });
    try {
      const token = getCookie(accessTokenKey);
      const data = await getUserRequest(token);
      if (data?.success && data?.user) {
        dispatch({ type: GET_USER_SUCCESS, payload: data.user });
      } else {
        dispatch({ type: GET_USER_FAILED });
      }
    } catch (err) {
      try {
        if (err === "Ошибка: 403") {
          await refreshToken();
          const token = getCookie(accessTokenKey);
          const data = await getUserRequest(token);
          if (data?.success && data?.user) {
            dispatch({ type: GET_USER_SUCCESS, payload: data.user });
          }
        } else {
          dispatch({ type: GET_USER_FAILED });
        }
      } catch (err) {
        dispatch({ type: GET_USER_FAILED });
      }
    }
  };
}

export const updateUser: AppThunk = (form: TUpdateUserForm) => {
  return async function (dispatch: AppDispatch) {
    dispatch({ type: UPDATE_USER });
    try {
      const token = getCookie(accessTokenKey);
      const data = await updateUserRequest(form, token);
      if (data?.success && data?.user) {
        dispatch({ type: UPDATE_USER_SUCCESS, payload: data.user });
      } else {
        dispatch({ type: UPDATE_USER_FAILED });
      }
    } catch (err) {
      try {
        if (err === "Ошибка: 403") {
          await refreshToken();
          const token = getCookie(accessTokenKey);
          const data = await updateUserRequest(form, token);
          if (data?.success && data?.user) {
            dispatch({ type: UPDATE_USER_SUCCESS, payload: data.user });
          }
        } else {
          dispatch({ type: UPDATE_USER_FAILED });
        }
      } catch (err) {
        dispatch({ type: UPDATE_USER_FAILED });
      }
    }
  };
}

export const logout: AppThunk = (history: History) => {
  return async function (dispatch: AppDispatch) {
    dispatch({ type: LOGOUT });
    try {
      const token = getStorageItem(refreshTokenKey);
      const data = await logoutRequest(token);
      if (data?.success) {
        deleteCookie(accessTokenKey);
        removeStorageItem(refreshTokenKey);
        history.push({ pathname: "/login" });
        dispatch({ type: LOGOUT_SUCCESS });
      } else {
        dispatch({ type: LOGOUT_FAILED });
      }
    } catch (err) {
      dispatch({ type: LOGOUT_FAILED });
    }
  };
}

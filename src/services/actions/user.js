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
import {
  accessTokenKey,
  refreshTokenKey,
  cookieExpires,
} from "../../utils/constants";

export const GET_USER = "GET_USER";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";

export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";
export const UPDATE_USER_FORM_CLEAR_STATE = "UPDATE_USER_FORM_CLEAR_STATE";

export const LOGOUT = "LOGOUT";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

export async function refreshToken() {
  const token = getStorageItem(refreshTokenKey);
  const data = await refreshTokenRequest(token);
  if (data?.success && data?.accessToken && data?.refreshToken) {
    const accessToken = data.accessToken.split("Bearer ")[1];
    const refreshToken = data.refreshToken;
    setCookie(accessTokenKey, accessToken, { expires: cookieExpires });
    setStorageItem(refreshTokenKey, refreshToken);
    return true;
  } else {
    return false;
  }
}

export async function getUser() {
  return async function (dispatch) {
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
      if (error === "Ошибка: 403") {
        await refreshToken();
        const token = getCookie(accessTokenKey);
        const data = await getUserRequest(token);
        if (data?.success && data?.user) {
          dispatch({ type: GET_USER_SUCCESS, payload: data.user });
        }
      }
      dispatch({ type: GET_USER_FAILED });
    }
  };
}

export async function updateUser(form) {
  return async function (dispatch) {
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
      if (error === "Ошибка: 403") {
        await refreshToken();
        const token = getCookie(accessTokenKey);
        const data = await updateUserRequest(form, token);
        if (data?.success && data?.user) {
          dispatch({ type: UPDATE_USER_SUCCESS, payload: data.user });
        }
      }
      dispatch({ type: UPDATE_USER_FAILED });
    }
  };
}

export function logout(history) {
  return async function (dispatch) {
    dispatch({ type: LOGOUT });
    try {
      const token = getStorageItem(refreshTokenKey);
      const data = await logoutRequest(token);
      if (data?.success) {
        deleteCookie(accessTokenKey);
        removeStorageItem(refreshTokenKey);
        history.replace({ pathname: "/" });
        dispatch({ type: LOGOUT_SUCCESS });
      } else {
        dispatch({ type: LOGOUT_FAILED });
      }
    } catch (err) {
      dispatch({ type: LOGOUT_FAILED });
    }
  };
}

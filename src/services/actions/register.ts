import { registerRequest } from "../../utils/api";
import { setCookie, deleteCookie } from "../../utils/cookies";
import { setStorageItem } from "../../utils/storage";
import { accessTokenKey, refreshTokenKey } from "../../utils/constants";
import { AppDispatch, AppThunk } from "../../types";

export const REGISTER = "REGISTER";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

export const REGISTER_FORM_CLEAR_STATE = "REGISTER_FORM_CLEAR_STATE";
export const REGISTER_FORM_SET_VALUE = "REGISTER_FORM_SET_VALUE";

export interface IRegister {
  readonly type: typeof REGISTER;
}

export interface IRegisterSuccess {
  readonly type: typeof REGISTER_SUCCESS;
}

export interface IRegisterFailed {
  readonly type: typeof REGISTER_FAILED;
}

export interface IRegisterFormClearState {
  readonly type: typeof REGISTER_FORM_CLEAR_STATE;
}

export interface IRegisterFormSetValue {
  readonly type: typeof REGISTER_FORM_SET_VALUE;
  readonly payload: {
    readonly field: string;
    readonly value: string;
  };
}

export type TRegisterActions =
  | IRegister
  | IRegisterSuccess
  | IRegisterFailed
  | IRegisterFormClearState
  | IRegisterFormSetValue;

export function setRegisterFormValue({
  field,
  value,
}: {
  field: string;
  value: string;
}): IRegisterFormSetValue {
  return {
    type: REGISTER_FORM_SET_VALUE,
    payload: { field, value },
  };
}

export const register: AppThunk = (form: TRegisterForm) => {
  return async function (dispatch: AppDispatch) {
    dispatch({ type: REGISTER });
    try {
      const data = await registerRequest(form);

      if (data?.success && data?.accessToken && data?.refreshToken) {
        const accessToken = data.accessToken.split("Bearer ")[1];
        const refreshToken = data.refreshToken;
        deleteCookie(accessTokenKey);
        setCookie(accessTokenKey, accessToken);
        setStorageItem(refreshTokenKey, refreshToken);

        dispatch({ type: REGISTER_SUCCESS });
        dispatch({ type: REGISTER_FORM_CLEAR_STATE });
      } else {
        dispatch({ type: REGISTER_FAILED });
      }
    } catch (err) {
      dispatch({ type: REGISTER_FAILED });
    }
  };
}

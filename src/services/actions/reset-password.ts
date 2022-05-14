import { resetPasswordRequest } from "../../utils/api";
import { AppDispatch, AppThunk } from "../../types";

export const RESET_PASSWORD = "RESET_PASSWORD";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";

export const RESET_PASSWORD_FORM_CLEAR_STATE =
  "RESET_PASSWORD_FORM_CLEAR_STATE";
export const RESET_PASSWORD_FORM_SET_VALUE = "RESET_PASSWORD_FORM_SET_VALUE";

export interface IResetPassword {
  readonly type: typeof RESET_PASSWORD;
}

export interface IResetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface IResetPasswordFailed {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

export interface IResetPasswordFormClearState {
  readonly type: typeof RESET_PASSWORD_FORM_CLEAR_STATE;
}

export interface IResetPasswordFormSetValue {
  readonly type: typeof RESET_PASSWORD_FORM_SET_VALUE;
  readonly payload: {
    readonly field: string;
    readonly value: string;
  };
}

export type TResetPasswordActions =
  | IResetPassword
  | IResetPasswordSuccess
  | IResetPasswordFailed
  | IResetPasswordFormClearState
  | IResetPasswordFormSetValue;

export function setResetPasswordFormValue({
  field,
  value,
}: {
  field: string;
  value: string;
}): IResetPasswordFormSetValue {
  return {
    type: RESET_PASSWORD_FORM_SET_VALUE,
    payload: { field, value },
  };
}

export const resetPassword: AppThunk = (form: TResetPasswordForm) => {
  return async function (dispatch: AppDispatch) {
    dispatch({ type: RESET_PASSWORD });
    try {
      const data = await resetPasswordRequest(form);
      if (data?.success) {
        dispatch({ type: RESET_PASSWORD_SUCCESS });
        dispatch({ type: RESET_PASSWORD_FORM_CLEAR_STATE });
      } else {
        dispatch({ type: RESET_PASSWORD_FAILED });
      }
    } catch (err) {
      dispatch({ type: RESET_PASSWORD_FAILED });
    }
  };
};

import { updatePasswordRequest } from "../../utils/api";
import { AppDispatch, AppThunk } from "../../types";

export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";

export const FORGOT_PASSWORD_FORM_CLEAR_STATE =
  "FORGOT_PASSWORD_FORM_CLEAR_STATE";
export const FORGOT_PASSWORD_FORM_SET_VALUE = "FORGOT_PASSWORD_FORM_SET_VALUE";

export interface IForgotPassword {
  readonly type: typeof FORGOT_PASSWORD;
}

export interface IForgotPasswordSuccess {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface IForgotPasswordFailed {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}

export interface IForgotPasswordFormClearState {
  readonly type: typeof FORGOT_PASSWORD_FORM_CLEAR_STATE;
}

export interface IForgotPasswordSetValue {
  readonly type: typeof FORGOT_PASSWORD_FORM_SET_VALUE;
  readonly payload: {
    readonly field: string;
    readonly value: string;
  };
}

export type TForgotPasswordActions =
  | IForgotPassword
  | IForgotPasswordSuccess
  | IForgotPasswordFailed
  | IForgotPasswordFormClearState
  | IForgotPasswordSetValue;

export function setForgotPasswordFormValue({
  field,
  value,
}: {
  field: string;
  value: string;
}): IForgotPasswordSetValue {
  return {
    type: FORGOT_PASSWORD_FORM_SET_VALUE,
    payload: { field, value },
  };
}

export const forgotPassword: AppThunk = (form: TForgotPasswordForm) => {
  return async function (dispatch: AppDispatch) {
    dispatch({ type: FORGOT_PASSWORD });
    try {
      const data = await updatePasswordRequest(form);
      if (data?.success) {
        dispatch({ type: FORGOT_PASSWORD_SUCCESS });
        dispatch({ type: FORGOT_PASSWORD_FORM_CLEAR_STATE });
      } else {
        dispatch({ type: FORGOT_PASSWORD_FAILED });
      }
    } catch (err) {
      dispatch({ type: FORGOT_PASSWORD_FAILED });
    }
  };
}

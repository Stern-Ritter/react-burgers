import {
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_FORM_CLEAR_STATE,
  RESET_PASSWORD_FORM_SET_VALUE,
  TResetPasswordActions,
} from "../actions/reset-password";

type TResetPasswordState = {
  data: TResetPasswordForm;
  loading: boolean;
  success: boolean;
  hasError: boolean;
};

const resetPasswordFormInitialState: TResetPasswordState = {
  data: {
    password: "",
    token: "",
  },
  loading: false,
  success: false,
  hasError: false,
};

export const resetPasswordFormReducer = (
  state = resetPasswordFormInitialState,
  action: TResetPasswordActions
): TResetPasswordState => {
  switch (action.type) {
    case RESET_PASSWORD: {
      return {
        ...state,
        loading: true,
        hasError: false,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
      };
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        loading: false,
        hasError: true,
      };
    }
    case RESET_PASSWORD_FORM_CLEAR_STATE: {
      return {
        ...state,
        data: {
          ...resetPasswordFormInitialState.data,
        },
      };
    }
    case RESET_PASSWORD_FORM_SET_VALUE: {
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.field]: action.payload.value,
        },
      };
    }
    default: {
      return state;
    }
  }
};

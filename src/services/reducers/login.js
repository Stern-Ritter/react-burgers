import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_FORM_CLEAR_STATE,
  LOGIN_FORM__SET_VALUE,
} from "../actions/login";

const loginFormInitialState = {
  data: {
    email: "",
    password: "",
  },
  loading: false,
  success: false,
  hasError: false,
};

export const loginFormReducer = (state = loginFormInitialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        loading: true,
        hasError: false,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loading: false,
        hasError: true,
      };
    }
    case LOGIN_FORM_CLEAR_STATE: {
      return {
        ...loginFormInitialState,
      };
    }
    case LOGIN_FORM__SET_VALUE: {
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

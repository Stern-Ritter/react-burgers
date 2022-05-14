import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";

import store from "../services/store";
import { TAllOrdersActions } from "../services/actions/all-orders";
import { TBurgerConstructorIngredientActions } from "../services/actions/burger-constructor";
import { TBurgerConstructorOrderActions } from "../services/actions/burger-constructor";
import { TForgotPasswordActions } from "../services/actions/forgot-password";
import { TIndexActions } from "../services/actions";
import { TLoginActions } from "../services/actions/login";
import { TRegisterActions } from "../services/actions/register";
import { TResetPasswordActions } from "../services/actions/reset-password";
import { TUserOrdersActions } from "../services/actions/user-orders";
import { TUserActions } from "../services/actions/user";

import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook,
} from 'react-redux';

type TApplicationActions =
  | TAllOrdersActions
  | TBurgerConstructorIngredientActions
  | TBurgerConstructorOrderActions
  | TForgotPasswordActions
  | TIndexActions
  | TLoginActions
  | TRegisterActions
  | TResetPasswordActions
  | TUserOrdersActions
  | TUserActions;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type AppDispatch = typeof store.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>(); 

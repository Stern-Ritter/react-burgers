import { getCookie } from "../../utils/cookies";
import { accessTokenKey } from "../../utils/constants";
import { postOrderRequest } from "../../utils/api";
import { AppDispatch, AppThunk } from "../../types";

export const POST_ORDER = "POST_ORDER";
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS";
export const POST_ORDER_FAILED = "POST_ORDER_FAILED";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const SHIFT_INGREDIENT = "SHIFT_INGREDIENT";

export interface IPostOrder {
  readonly type: typeof POST_ORDER;
}

export interface IPostOrderSuccess {
  readonly type: typeof POST_ORDER_SUCCESS;
  readonly data: {
    order: TOrder;
  }
}

export interface IPostOrderFailed {
  readonly type: typeof POST_ORDER_FAILED;
}

export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT;
  readonly ingredient: {
    id: string;
    type: string;
  };
}

export interface IRemoveIngredient {
  readonly type: typeof REMOVE_INGREDIENT;
  readonly idx: number;
}

export interface IShiftIngredient {
  readonly type: typeof SHIFT_INGREDIENT;
  readonly fromIndex: number;
  readonly toIndex: number;
}

export type TBurgerConstructorIngredientActions =
  | IAddIngredient
  | IRemoveIngredient
  | IShiftIngredient;

export type TBurgerConstructorOrderActions =
  | IPostOrder
  | IPostOrderSuccess
  | IPostOrderFailed;

export const postOrder: AppThunk = (ingredients: TIngredients) => {
  return async function (dispatch: AppDispatch) {
    dispatch({ type: POST_ORDER });
    try {
      const token = getCookie(accessTokenKey);
      const data = await postOrderRequest(ingredients, token);
      if (data?.success) {
        dispatch({ type: POST_ORDER_SUCCESS, data });
      } else {
        dispatch({ type: POST_ORDER_FAILED });
      }
    } catch (err) {
      dispatch({ type: POST_ORDER_FAILED });
    }
  };
}

import { API, checkResponse } from "../../utils/api";
import { AppDispatch, AppThunk } from "../../types";

export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export interface IGetIngredients {
  readonly type: typeof GET_INGREDIENTS;
}

export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly data: Array<TIngredient>;
}

export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TIndexActions =
  | IGetIngredients
  | IGetIngredientsSuccess
  | IGetIngredientsFailed;

export const getIngredients: AppThunk = () => {
  return async function (dispatch: AppDispatch) {
    dispatch({ type: GET_INGREDIENTS });
    try {
      const res = await fetch(`${API}/ingredients`);
      const { data } = await checkResponse(res, "application/json");
      dispatch({ type: GET_INGREDIENTS_SUCCESS, data });
    } catch (err) {
      dispatch({ type: GET_INGREDIENTS_FAILED });
    }
  };
}

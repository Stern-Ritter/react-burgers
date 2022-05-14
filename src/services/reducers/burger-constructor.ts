import {
  POST_ORDER,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SHIFT_INGREDIENT,
  TBurgerConstructorIngredientActions,
  TBurgerConstructorOrderActions,
} from "../actions/burger-constructor";

type TConstructorState = {
  bun: string;
  main: Array<string>;
};

type TOrderState = {
  loading: boolean;
  hasError: boolean;
  data: { order: TOrder } | null;
};

const constructorInitialState: TConstructorState = {
  bun: "",
  main: [],
};

const orderInitialState: TOrderState = {
  loading: false,
  hasError: false,
  data: null,
};

export const constructorReducer = (
  state = constructorInitialState,
  action: TBurgerConstructorIngredientActions
): TConstructorState => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      if (action.ingredient.type === "bun") {
        return {
          ...state,
          bun: action.ingredient.id,
        };
      } else {
        return {
          ...state,
          main: [...state.main, action.ingredient.id],
        };
      }
    }
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        main: state.main.filter((_, idx) => idx !== action.idx),
      };
    }
    case SHIFT_INGREDIENT: {
      const main = [...state.main];
      const element = main[action.fromIndex];
      main.splice(action.fromIndex, 1);
      main.splice(action.toIndex, 0, element);
      return {
        ...state,
        main,
      };
    }
    default: {
      return state;
    }
  }
};

export const orderReducer = (
  state = orderInitialState,
  action: TBurgerConstructorOrderActions
): TOrderState => {
  switch (action.type) {
    case POST_ORDER: {
      return {
        ...state,
        loading: true,
        hasError: false,
        data: null,
      };
    }
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    }
    case POST_ORDER_FAILED: {
      return {
        ...orderInitialState,
        hasError: true,
      };
    }
    default: {
      return state;
    }
  }
};

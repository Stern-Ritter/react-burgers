import {
  WS_USER_ORDERS_CONNECTION_SUCCESS,
  WS_USER_ORDERS_CONNECTION_ERROR,
  WS_USER_ORDERS_CONNECTION_CLOSED,
  WS_USER_ORDERS_GET_ORDER,
  TUserOrdersActions,
} from "../actions/user-orders";

type TUserOrdersState = {
  wsConnected: boolean;
  orders: Array<TOrder>;
};

const userOrdersInitialState: TUserOrdersState = {
  wsConnected: false,
  orders: [],
};

export const userOrdersWsReducer = (
  state = userOrdersInitialState,
  action: TUserOrdersActions
): TUserOrdersState => {
  switch (action.type) {
    case WS_USER_ORDERS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnected: true,
      };
    }
    case WS_USER_ORDERS_CONNECTION_ERROR: {
      return {
        ...state,
        wsConnected: false,
      };
    }
    case WS_USER_ORDERS_CONNECTION_CLOSED: {
      return {
        ...state,
        wsConnected: false,
      };
    }
    case WS_USER_ORDERS_GET_ORDER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

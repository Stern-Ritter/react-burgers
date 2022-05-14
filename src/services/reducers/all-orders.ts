import {
  WS_ALL_ORDERS_CONNECTION_SUCCESS,
  WS_ALL_ORDERS_CONNECTION_ERROR,
  WS_ALL_ORDERS_CONNECTION_CLOSED,
  WS_ALL_ORDERS_GET_ORDER,
  TAllOrdersActions,
} from "../actions/all-orders";

type TAllOrdersState = {
  wsConnected: boolean;
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
};

const allOrdersInitialState: TAllOrdersState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

export const allOrdersWsReducer = (
  state = allOrdersInitialState,
  action: TAllOrdersActions
): TAllOrdersState  => {
  switch (action.type) {
    case WS_ALL_ORDERS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnected: true,
      };
    }
    case WS_ALL_ORDERS_CONNECTION_ERROR: {
      return {
        ...state,
        wsConnected: false,
      };
    }
    case WS_ALL_ORDERS_CONNECTION_CLOSED: {
      return {
        ...state,
        wsConnected: false,
      };
    }
    case WS_ALL_ORDERS_GET_ORDER: {
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

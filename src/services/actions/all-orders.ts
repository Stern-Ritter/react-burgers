export const WS_ALL_ORDERS_CONNECTION_START = "WS_ALL_ORDERS_CONNECTION_START";
export const WS_ALL_ORDERS_CONNECTION_SUCCESS =
  "WS_ALL_ORDERS_CONNECTION_SUCCESS";
export const WS_ALL_ORDERS_CONNECTION_ERROR = "WS_ALL_ORDERS_CONNECTION_ERROR";
export const WS_ALL_ORDERS_CONNECTION_CLOSING =
  "WS_ALL_ORDERS_CONNECTION_CLOSING";
export const WS_ALL_ORDERS_CONNECTION_CLOSED =
  "WS_ALL_ORDERS_CONNECTION_CLOSED";
export const WS_ALL_ORDERS_GET_ORDER = "WS_ALL_ORDERS_GET_ORDER";

export interface IWsAllOrdersConnectionStart {
  readonly type: typeof WS_ALL_ORDERS_CONNECTION_START;
}

export interface IWasAllOrdersConnectionSuccess {
  readonly type: typeof WS_ALL_ORDERS_CONNECTION_SUCCESS;
}

export interface IWsAllOrdersConnectionError {
  readonly type: typeof WS_ALL_ORDERS_CONNECTION_ERROR;
}

export interface IWsAllOrdersConnectionClosing {
  readonly type: typeof WS_ALL_ORDERS_CONNECTION_CLOSING;
}

export interface IWsAllOrdersConnectionClosed {
  readonly type: typeof WS_ALL_ORDERS_CONNECTION_CLOSED;
}

export interface IWsAllOrdersGetOrder {
  readonly type: typeof WS_ALL_ORDERS_GET_ORDER;
  readonly payload: {
    orders: Array<TOrder>;
    total: number;
    totalToday: number;
  }
}

export type TAllOrdersActions =
  | IWsAllOrdersConnectionStart
  | IWasAllOrdersConnectionSuccess
  | IWsAllOrdersConnectionError
  | IWsAllOrdersConnectionClosing
  | IWsAllOrdersConnectionClosed
  | IWsAllOrdersGetOrder;

export const wsAllOrdersConnectionStart = (): IWsAllOrdersConnectionStart => {
  return {
    type: WS_ALL_ORDERS_CONNECTION_START,
  };
};

export const wsAllOrdersConnectionClosing =
  (): IWsAllOrdersConnectionClosing => {
    return {
      type: WS_ALL_ORDERS_CONNECTION_CLOSING,
    };
  };

export const wsAllOrdersActions = {
  wsInit: WS_ALL_ORDERS_CONNECTION_START,
  onOpen: WS_ALL_ORDERS_CONNECTION_SUCCESS,
  onClosing: WS_ALL_ORDERS_CONNECTION_CLOSING,
  onClose: WS_ALL_ORDERS_CONNECTION_CLOSED,
  onError: WS_ALL_ORDERS_CONNECTION_ERROR,
  onMessage: WS_ALL_ORDERS_GET_ORDER,
} as const;

export type TWsAllOrdersActions = typeof wsAllOrdersActions;

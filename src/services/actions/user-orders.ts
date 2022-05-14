export const WS_USER_ORDERS_CONNECTION_START =
  "WS_USER_ORDERS_CONNECTION_START";
export const WS_USER_ORDERS_CONNECTION_SUCCESS =
  "WS_USER_ORDERS_CONNECTION_SUCCESS";
export const WS_USER_ORDERS_CONNECTION_ERROR =
  "WS_USER_ORDERS_CONNECTION_ERROR";
export const WS_USER_ORDERS_CONNECTION_CLOSING =
  "WS_USER_ORDERS_CONNECTION_CLOSING";
export const WS_USER_ORDERS_CONNECTION_CLOSED =
  "WS_USER_ORDERS_CONNECTION_CLOSED";
export const WS_USER_ORDERS_GET_ORDER = "WS_USER_ORDERS_GET_ORDER";

export interface IWsUserOrdersConnectionStart {
  readonly type: typeof WS_USER_ORDERS_CONNECTION_START;
  readonly payload: {
    readonly token: string;
  };
}

export interface IWsUserOrdersConnectionSuccess {
  readonly type: typeof WS_USER_ORDERS_CONNECTION_SUCCESS;
}

export interface IWsUserOrdersConnectionError {
  readonly type: typeof WS_USER_ORDERS_CONNECTION_ERROR;
}

export interface IWsUserOrdersConnectionClosing {
  readonly type: typeof WS_USER_ORDERS_CONNECTION_CLOSING;
}

export interface IWsUserOrdersConnectionClosed {
  readonly type: typeof WS_USER_ORDERS_CONNECTION_CLOSED;
}

export interface IWsUserOrdersGetOrder {
  readonly type: typeof WS_USER_ORDERS_GET_ORDER;
  readonly payload: {
    orders: Array<TOrder>;
  };
}

export type TUserOrdersActions =
  | IWsUserOrdersConnectionStart
  | IWsUserOrdersConnectionSuccess
  | IWsUserOrdersConnectionError
  | IWsUserOrdersConnectionClosing
  | IWsUserOrdersConnectionClosed
  | IWsUserOrdersGetOrder;

export const wsUserOrdersConnectionStart = (
  token: string
): IWsUserOrdersConnectionStart => {
  return {
    type: WS_USER_ORDERS_CONNECTION_START,
    payload: { token },
  };
};

export const wsUserOrdersConnectionClosing =
  (): IWsUserOrdersConnectionClosing => {
    return {
      type: WS_USER_ORDERS_CONNECTION_CLOSING,
    };
  };

export const wsUserOrdersActions = {
  wsInit: WS_USER_ORDERS_CONNECTION_START,
  onOpen: WS_USER_ORDERS_CONNECTION_SUCCESS,
  onClosing: WS_USER_ORDERS_CONNECTION_CLOSING,
  onClose: WS_USER_ORDERS_CONNECTION_CLOSED,
  onError: WS_USER_ORDERS_CONNECTION_ERROR,
  onMessage: WS_USER_ORDERS_GET_ORDER,
} as const;

export type TWsUserOrdersActions = typeof wsUserOrdersActions;

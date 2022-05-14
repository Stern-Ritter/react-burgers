import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeEnhancers } from "./composeEnhancers";
import { rootReducer } from "./reducers";
import { socketMiddleware } from "./middleware/socketMiddleware";
import { wsAllOrdersActions } from "./actions/all-orders";
import { wsUserOrdersActions } from "./actions/user-orders";
import { wsAllOrdersAPI, wsUserOrdersAPI } from "../utils/api";

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware(wsAllOrdersAPI, wsAllOrdersActions),
    socketMiddleware(wsUserOrdersAPI, wsUserOrdersActions)
  )
);
const store = createStore(rootReducer, enhancer);

export default store;

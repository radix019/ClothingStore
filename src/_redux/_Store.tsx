import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from "redux";
import logger from "redux-logger";
import { dataReducer } from "./DataReducer";
import { ShoppingCartReducer } from "./ShoppingCartReducer";
import { UserAuthReducer } from "./UserAuthReducer";

export type IRootState = ReturnType<typeof rootReducer>;
// export const useSelector = createSelectorHook<IRootState>();

const rootReducer = combineReducers({
  userAuth: UserAuthReducer,
  data: dataReducer,
  cart: ShoppingCartReducer,
});

const store = createStore(
  rootReducer,
  undefined,
  compose(applyMiddleware(logger))
);

export default store;

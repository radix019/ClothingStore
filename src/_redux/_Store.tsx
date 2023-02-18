import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from "redux";
import logger from "redux-logger";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
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

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["userAuth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  undefined,
  compose(applyMiddleware(logger))
);

export default store;

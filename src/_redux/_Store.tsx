import { createSelectorHook } from "react-redux";
import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from "redux";
import logger from "redux-logger";
import { UserAuthReducer } from "./UserAuthReducer";

export type IRootState = ReturnType<typeof rootReducer>;
// export const useSelector = createSelectorHook<IRootState>();

const rootReducer = combineReducers({
  userAuth: UserAuthReducer,
});

const store = createStore(
  rootReducer,
  undefined,
  compose(applyMiddleware(logger))
);

export default store;

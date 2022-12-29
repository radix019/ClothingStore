import produce from "immer";
import { DATA_ACTION_TYPE } from "../_global/_Enum";
import { ShopData } from "../_global/_Interfaces";
interface DataState {
  products: Array<ShopData>;
}

interface DataAction {
  type: DATA_ACTION_TYPE;
  payload: Array<ShopData>;
}

const initDataState: DataState = {
  products: [],
};

export const dataReducer = (state = initDataState, action: DataAction) => {
  switch (action.type) {
    case DATA_ACTION_TYPE.SET_PRODUCTS_DATA:
      const apiProductsData = action.payload;
      return produce(state, (draft) => {
        draft.products = apiProductsData;
      });

    default:
      return state;
  }
};

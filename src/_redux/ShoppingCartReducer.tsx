import produce from "immer";
import { Product } from "../types_models";
import { SHOPPING_CART_ACTION_TYPE } from "../_global/_Enum";
export interface ShoppingCartAction {
  type: SHOPPING_CART_ACTION_TYPE;
  payload: any;
}
export interface ShoppingCartReducerState {
  isCartOpen: boolean;
  cartItems: Product[];
  cartCount: number;
  cartTotal: number;
}

const initShoppingCartReducerState: ShoppingCartReducerState = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

export const ShoppingCartReducer = (
  state = initShoppingCartReducerState,
  action: ShoppingCartAction
) => {
  switch (action.type) {
    case SHOPPING_CART_ACTION_TYPE.SET_ITEM_TO_CART:
      const payload = action.payload;
      return produce(state, (draft) => {
        draft.cartItems = payload;
        draft.cartCount = payload.reduce(
          (total: number, { quantity = 1 }) => total + quantity,
          0
        );
        draft.cartTotal = draft.cartItems
          .map(({ price, quantity = 1 }) => price * quantity)
          .reduce((acc, cur) => acc + cur, 0);
      });
    case SHOPPING_CART_ACTION_TYPE.SET_IS_CART_OPEN:
      const isCartOpen = action.payload as boolean;
      return produce(state, (draft) => {
        draft.isCartOpen = isCartOpen;
      });
    default:
      return state;
  }
};

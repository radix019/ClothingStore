import produce from "immer";
import React, { createContext } from "react";
import { Product } from "../types_models";

// defined useReducer
export enum SHOPPING_CART_ACTION_TYPE {
  SET_ITEM_TO_CART = "SET_ITEM_TO_CART",
}
export interface ShoppingCartAction {
  type: SHOPPING_CART_ACTION_TYPE;
  payload: { cartItems: Product[]; cartCount: number; cartTotal: number };
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
  const { type, payload } = action;
  switch (type) {
    case SHOPPING_CART_ACTION_TYPE.SET_ITEM_TO_CART:
      return produce(state, (draft) => {
        draft.cartItems = payload.cartItems;
        draft.cartCount = payload.cartCount;
        draft.cartTotal = payload.cartTotal;
      });

    default:
      throw new Error("Couldn't find type ", type);
  }
};

interface ShoppingCartProps {
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: Product[];
  addToCart: (product: Product) => void;
  cartCount: number;
  removeFromCart: (product: Product) => void;
  deleteItemFromCart: (product: Product) => void;
  cartTotal: number;
}
export const ShoppingCart = createContext<ShoppingCartProps>({
  isCartOpen: false,
  setIsCartOpen: () => false,
  cartItems: [],
  addToCart: (product) => {},
  cartCount: 0,
  removeFromCart: () => {},
  deleteItemFromCart: () => {},
  cartTotal: 0,
});

interface ShoppingCartProviderProps {
  children: React.ReactNode;
}

export const ShoppingCartProvider = React.memo<ShoppingCartProviderProps>(
  ({ children }) => {
    const [isCartOpen, setIsCartOpen] = React.useState<boolean>(false);
    const [shpppingCartReducer, dispatch] = React.useReducer(
      ShoppingCartReducer,
      initShoppingCartReducerState
    );
    const { cartItems, cartCount, cartTotal } = shpppingCartReducer;

    const updateCartItemsReducer = (cartItems: Product[]) => {
      const newCartCount = cartItems.reduce(
        (total, { quantity = 1 }) => total + quantity,
        0
      );

      const newCartTotal = cartItems
        .map(({ price, quantity = 1 }) => price * quantity)
        .reduce((acc, cur) => acc + cur, 0);

      const payload = {
        cartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal,
      };

      dispatch({
        type: SHOPPING_CART_ACTION_TYPE.SET_ITEM_TO_CART,
        payload: payload,
      });
    };

    const addToCart = (product: Product) => {
      let updatedCartItems;
      if (cartItems.find((cartItem) => cartItem.id === product.id)) {
        // this implementation violates DRY rule, need to find better solution
        updatedCartItems = cartItems.map(
          ({ id, name, imageUrl, price, quantity = 1 }) =>
            id === product.id
              ? { id, name, imageUrl, price, quantity: quantity + 1 }
              : { id, name, imageUrl, price, quantity }
        );
      } else {
        updatedCartItems = [...cartItems, { ...product, quantity: 1 }];
      }
      updateCartItemsReducer(updatedCartItems);
    };

    const removeFromCart = (product: Product) => {
      const targetProduct = cartItems.find(
        (cartItem) => cartItem.id === product.id
      );

      if (targetProduct?.quantity === 1) {
        updateCartItemsReducer(
          cartItems.filter((item) => item.id !== targetProduct.id)
        );
      }
      const updatedCartItems = cartItems.map(
        ({ id, name, imageUrl, price, quantity = 1 }) =>
          id === product.id
            ? { id, name, imageUrl, price, quantity: quantity - 1 }
            : { id, name, imageUrl, price, quantity }
      );
      updateCartItemsReducer(updatedCartItems);
    };

    const deleteItemFromCart = (product: Product) => {
      updateCartItemsReducer(
        cartItems.filter((item) => item.id !== product.id)
      );
    };

    const value = {
      isCartOpen,
      setIsCartOpen,
      cartItems,
      addToCart,
      cartCount,
      removeFromCart,
      deleteItemFromCart,
      cartTotal,
    };
    return (
      <ShoppingCart.Provider value={value}>{children}</ShoppingCart.Provider>
    );
  }
);

import produce from "immer";
import React, { createContext } from "react";
import { Product } from "../types_models";

interface ShoppingCartProps {
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: Product[];
  addToCart: (product: Product) => void;
  cartCount: number;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
  removeFromCart: (product: Product) => void;
  deleteItemFromCart: (product: Product) => void;
  totalCartAmount: number;
  setTotalCartAmount: React.Dispatch<React.SetStateAction<number>>;
}
export const ShoppingCart = createContext<ShoppingCartProps>({
  isCartOpen: false,
  setIsCartOpen: () => false,
  cartItems: [],
  addToCart: (product) => {},
  cartCount: 0,
  setCartCount: () => 0,
  removeFromCart: () => {},
  deleteItemFromCart: () => {},
  totalCartAmount: 0,
  setTotalCartAmount: () => {},
});

interface ShoppingCartProviderProps {
  children: React.ReactNode;
}

export enum SHOPPING_CART_ACTION_TYPE {
  SET_ITEM_TO_CART = "SET_ITEM_TO_CART",
}
export interface ShoppingCartAction {
  type: SHOPPING_CART_ACTION_TYPE;
  payload: any;
}
export interface ShoppingCartReducerState {
  isCartOpen: boolean;
  cartItems: Product[];
  cartCount: number;
  totalCartAmount: number;
}

const initShoppingCartReducerState: ShoppingCartReducerState = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  totalCartAmount: 0,
};

export const ShoppingCartReducer = (
  state = initShoppingCartReducerState,
  action: ShoppingCartAction
) => {
  const { type, payload } = action;
  switch (type) {
    case SHOPPING_CART_ACTION_TYPE.SET_ITEM_TO_CART:
      return produce(state, (draft) => {
        draft.cartItems = payload;
      });

    default:
      throw new Error("Couldn't find type ", type);
  }
};

export const ShoppingCartProvider = React.memo<ShoppingCartProviderProps>(
  ({ children }) => {
    const [isCartOpen, setIsCartOpen] = React.useState<boolean>(false);
    const [shpppingCartReducer, dispatch] = React.useReducer(
      ShoppingCartReducer,
      initShoppingCartReducerState
    );
    const { cartItems } = shpppingCartReducer;

    const [cartCount, setCartCount] = React.useState<number>(0);
    const [totalCartAmount, setTotalCartAmount] = React.useState<number>(0);

    const addToCart = (product: Product) => {
      if (cartItems.find((cartItem) => cartItem.id === product.id)) {
        // this implementation violates DRY rule, need to find better solution
        const payload = cartItems.map(
          ({ id, name, imageUrl, price, quantity = 1 }) =>
            id === product.id
              ? { id, name, imageUrl, price, quantity: quantity + 1 }
              : { id, name, imageUrl, price, quantity }
        );

        dispatch({
          type: SHOPPING_CART_ACTION_TYPE.SET_ITEM_TO_CART,
          payload: payload,
        });
      } else {
        dispatch({
          type: SHOPPING_CART_ACTION_TYPE.SET_ITEM_TO_CART,
          payload: [...cartItems, { ...product, quantity: 1 }],
        });
      }
    };

    const removeFromCart = (product: Product) => {
      const targetProduct = cartItems.find(
        (cartItem) => cartItem.id === product.id
      );
      if (targetProduct?.quantity === 1) {
        dispatch({
          type: SHOPPING_CART_ACTION_TYPE.SET_ITEM_TO_CART,
          payload: cartItems.filter((item) => item.id !== targetProduct.id),
        });
      }
      const payload = cartItems.map(
        ({ id, name, imageUrl, price, quantity = 1 }) =>
          id === product.id
            ? { id, name, imageUrl, price, quantity: quantity - 1 }
            : { id, name, imageUrl, price, quantity }
      );
      dispatch({
        type: SHOPPING_CART_ACTION_TYPE.SET_ITEM_TO_CART,
        payload: payload,
      });
    };

    const deleteItemFromCart = (product: Product) => {
      dispatch({
        type: SHOPPING_CART_ACTION_TYPE.SET_ITEM_TO_CART,
        payload: cartItems.filter((item) => item.id !== product.id),
      });
    };

    React.useEffect(() => {
      setTotalCartAmount(
        cartItems
          .map(({ price, quantity = 1 }) => price * quantity)
          .reduce((acc, cur) => acc + cur, 0)
      );
    }, [cartItems]);

    React.useEffect(() => {
      const newCount = cartItems.reduce(
        (total, { quantity = 1 }) => total + quantity,
        0
      );
      setCartCount(newCount);
    }, [cartItems]);

    const value = {
      isCartOpen,
      setIsCartOpen,
      cartItems,
      addToCart,
      cartCount,
      setCartCount,
      removeFromCart,
      deleteItemFromCart,
      totalCartAmount,
      setTotalCartAmount,
    };
    return (
      <ShoppingCart.Provider value={value}>{children}</ShoppingCart.Provider>
    );
  }
);

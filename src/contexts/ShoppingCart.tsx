import React, { createContext } from "react";
import { Product } from "../types_models";

interface ShoppingCartProps {
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: Product[];
  setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
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
  setCartItems: () => {},
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

export const ShoppingCartProvider = React.memo<ShoppingCartProviderProps>(
  ({ children }) => {
    const [isCartOpen, setIsCartOpen] = React.useState<boolean>(false);
    const [cartItems, setCartItems] = React.useState<Array<Product>>([]);
    const [cartCount, setCartCount] = React.useState<number>(0);
    const [totalCartAmount, setTotalCartAmount] = React.useState<number>(0);

    const addToCart = (product: Product) => {
      if (cartItems.find((cartItem) => cartItem.id === product.id)) {
        setCartItems((state) =>
          // this implementation violates DRY rule, need to find better solution
          state.map(({ id, name, imageUrl, price, quantity = 1 }) =>
            id === product.id
              ? { id, name, imageUrl, price, quantity: quantity + 1 }
              : { id, name, imageUrl, price, quantity }
          )
        );
      } else {
        setCartItems([...cartItems, { ...product, quantity: 1 }]);
      }
    };

    const removeFromCart = (product: Product) => {
      const targetProduct = cartItems.find(
        (cartItem) => cartItem.id === product.id
      );
      if (targetProduct?.quantity === 1) {
        setCartItems((state) =>
          state.filter((item) => item.id !== targetProduct.id)
        );
      }
      return setCartItems((state) =>
        state.map(({ id, name, imageUrl, price, quantity = 1 }) =>
          id === product.id
            ? { id, name, imageUrl, price, quantity: quantity - 1 }
            : { id, name, imageUrl, price, quantity }
        )
      );
    };
    const deleteItemFromCart = (product: Product) => {
      setCartItems((state) => state.filter((item) => item.id !== product.id));
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
      setCartItems,
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

import React, { createContext } from "react";

interface CartItems {
  id: number;
  name: string;
  quantity: number;
}
interface ShoppingCartProps {
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const ShoppingCart = createContext<ShoppingCartProps>({
  isCartOpen: false,
  setIsCartOpen: () => false,
});

interface ShoppingCartProviderProps {
  children: React.ReactNode;
}

export const ShoppingCartProvider = React.memo<ShoppingCartProviderProps>(
  ({ children }) => {
    const [isCartOpen, setIsCartOpen] = React.useState<boolean>(false);

    const value = { isCartOpen, setIsCartOpen };
    return (
      <ShoppingCart.Provider value={value}>{children}</ShoppingCart.Provider>
    );
  }
);

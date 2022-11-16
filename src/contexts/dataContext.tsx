import React, { createContext } from "react";
import ShoppingItems from "../shop-data.json";

interface Products {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

interface ProductContextProps {
  products: Array<Products>;
}
export const ProductContext = createContext<ProductContextProps>({
  products: [],
});

interface ProductContextProviderProps {
  children: React.ReactNode;
}

export const ProductContextProvider = React.memo<ProductContextProviderProps>(
  (props) => {
    const [products, setProducts] =
      React.useState<Array<Products>>(ShoppingItems);
    const value = { products };
    return (
      <ProductContext.Provider value={value}>
        {props.children}
      </ProductContext.Provider>
    );
  }
);

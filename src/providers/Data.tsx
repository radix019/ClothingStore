import React, { createContext } from "react";
import { getCollectionAndDocument } from "../_api/firebaseConfig";
import { ShopData } from "../_global/_Interfaces";

interface ProductContextProps {
  products: Array<ShopData>;
}

export const ProductContext = createContext<ProductContextProps>({
  products: [],
});
interface ProductContextProviderProps {
  children: React.ReactNode;
}

export const ProductContextProvider = React.memo<ProductContextProviderProps>(
  (props) => {
    const [products, setProducts] = React.useState<Array<ShopData>>([]);

    React.useEffect(() => {
      const asynFn = async () => {
        const querySnapshot = await getCollectionAndDocument();
        const productsData: any = [];
        querySnapshot.forEach((item) => {
          // need to capture this data in a Map object instead of array, to be done later
          productsData.push(item.data());
        });
        setProducts(productsData);
      };
      asynFn();
    }, []);
    const value = { products };
    return (
      <ProductContext.Provider value={value}>
        {props.children}
      </ProductContext.Provider>
    );
  }
);

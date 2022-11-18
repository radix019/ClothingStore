import React from "react";
import { ProductContext } from "../../contexts/dataContext";
import ProductCard from "../productCard/productCard";
import "./Products.scss";

const Products = () => {
  const { products } = React.useContext(ProductContext);
  return (
    <div className="products-container">
      {products.map((item) => (
        <ProductCard
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          imageUrl={item.imageUrl}
        />
      ))}
    </div>
  );
};

export default Products;

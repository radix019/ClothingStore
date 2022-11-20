import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/productCard/productCard";
import { ProductContext } from "../../contexts/dataContext";

import "./categories-preview.scss";
enum CategoriesRoutes {
  HATS = "hats",
  JACKETS = "jackets",
  MENS = "mens",
  SNEAKERS = "sneakers",
  WOMENS = "womens",
}
const CategoriesPreview = () => {
  const { products } = React.useContext(ProductContext);
  const navigate = useNavigate();
  const navigateTo = (title: string) => {
    navigate(`/shop/${title}`);
  };
  return (
    <div className="products-wrapper">
      {/* This implementation does not feel good, need to find better way */}
      {products.map((item, _i) => (
        <Fragment key={item.title}>
          <h2 onClick={() => navigateTo(item.title)}>
            {item.title.toUpperCase()}
          </h2>
          <div className="products-container">
            {item.items.slice(0, 4).map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                imageUrl={item.imageUrl}
              />
            ))}
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default CategoriesPreview;

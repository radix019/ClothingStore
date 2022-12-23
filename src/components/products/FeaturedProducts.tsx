import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../common/productCard/productCard";
import { ProductContext } from "../../providers/Data";

import "./FeaturedProducts.scss";
import { PAGE_TYPE } from "../../_global/Route";

const FeaturedProducts = () => {
  const { products } = React.useContext(ProductContext);
  const navigate = useNavigate();
  const navigateTo = (categoryPage: string) => {
    navigate(`/${PAGE_TYPE.SHOP}/${categoryPage}`);
  };
  return (
    <div className="products-wrapper">
      {/* This implementation does not feel good, need to find better way */}
      {products.map((item, _i) => (
        <Fragment key={item.title}>
          <div className="title-header">
            <h2>{item.title.toUpperCase()}</h2>
            <h3>
              <span onClick={() => navigateTo(item.title)}>View all</span>
            </h3>
          </div>
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

export default FeaturedProducts;

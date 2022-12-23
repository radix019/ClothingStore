import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../common/productCard/productCard";
import { ProductContext } from "../../providers/Data";
import "./AllProductsList.scss";

const AllProductsList = () => {
  const { category } = useParams();
  const { products } = React.useContext(ProductContext);
  return (
    <>
      {products
        .filter((item) => item.title === category)
        .map((item) => (
          <Fragment key={item.title}>
            <h2>{item.title}</h2>
            <div key={item.title} className="category-wrapper-container">
              {item.items.map((item) => (
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
    </>
  );
};

export default AllProductsList;

import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/productCard/productCard";
import { ProductContext } from "../../contexts/dataContext";
import "./category.scss";

const Category = () => {
  const { category } = useParams();
  const { products } = React.useContext(ProductContext);
  console.log("CATEGORY", category);
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

export default Category;

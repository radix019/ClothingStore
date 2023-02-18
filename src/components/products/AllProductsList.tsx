import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ShopData } from "../../_global/_Interfaces";
import { IRootState } from "../../_redux/_Store";
import ProductCard from "../common/productCard/productCard";
import "./AllProductsList.scss";

const AllProductsList = () => {
  const { category } = useParams();
  const apiProducts = useSelector((state: IRootState) => state.data.products);
  const [products, setProducts] = React.useState<ShopData[]>([]);

  React.useEffect(() => {
    setProducts(apiProducts.filter((item) => item.title === category));
  }, [apiProducts, category]);

  return (
    <>
      {products.map((item) => (
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

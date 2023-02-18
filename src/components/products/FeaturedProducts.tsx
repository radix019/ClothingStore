import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../common/productCard/productCard";
import "./FeaturedProducts.scss";
import { PAGE_TYPE } from "../../_global/Route";
import { IRootState } from "../../_redux/_Store";
import { useSelector } from "react-redux";
import { ShopData } from "../../_global/_Interfaces";

const FeaturedProducts = () => {
  const apiProducts = useSelector((state: IRootState) => state.data.products);
  const navigate = useNavigate();
  const [products, setProducts] = React.useState<ShopData[]>([]);
  const navigateTo = (categoryPage: string) => {
    navigate(`/${PAGE_TYPE.SHOP}/${categoryPage}`);
  };
  React.useEffect(() => {
    setProducts(apiProducts);
  }, [apiProducts]);

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

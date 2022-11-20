import React from "react";
import { ShoppingCart } from "../../contexts/ShoppingCart";
import ActionButton from "../buttons/actionButton";
import "./product-card.styles.scss";

export interface ProductCardProps {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

const ProductCard = ({ id, name, imageUrl, price }: ProductCardProps) => {
  const shopping = React.useContext(ShoppingCart);
  const onAddToCart = () => {
    shopping.addToCart({ id, name, imageUrl, price });
  };
  return (
    <div className="product-card-container">
      <img className="img" src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>
      <ActionButton onClick={onAddToCart} ClassType="inverted">
        Add to Cart
      </ActionButton>
    </div>
  );
};

export default ProductCard;

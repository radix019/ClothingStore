import React from "react";
import "./cart-item.scss";

interface CartItemProps {
  name: string;
  quantity?: number;
  imageUrl: string;
  price: number;
}

const CartItem = React.memo<CartItemProps>(
  ({ name, imageUrl, price, quantity }) => {
    return (
      <div className="cart-item-container">
        <img src={imageUrl} alt={name} />
        <div className="item-details">
          <h2>{name}</h2>
          <span className="price">
            {quantity} x ${price}
          </span>
        </div>
      </div>
    );
  }
);

export default CartItem;

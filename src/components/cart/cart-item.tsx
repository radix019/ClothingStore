import React from "react";
import "./cart-item.scss";

interface CartItemProps {
  id: number;
  name: string;
  quantity: number;
}

const CartItem = React.memo<CartItemProps>(({ id, name, quantity }) => {
  return (
    <div>
      <h2>{name}</h2>
      <span>{quantity}</span>
    </div>
  );
});

export default CartItem;

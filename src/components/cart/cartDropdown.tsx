import React from "react";
import { ShoppingCart } from "../../contexts/ShoppingCart";
import ActionButton from "../buttons/actionButton";
import "./cart-dropdown.scss";
import CartItem from "./cart-item";

const CartDropdown = () => {
  const shopping = React.useContext(ShoppingCart);
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {shopping.cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <ActionButton>Go to Checkout</ActionButton>
    </div>
  );
};

export default CartDropdown;

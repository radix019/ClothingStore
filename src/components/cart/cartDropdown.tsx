import React from "react";
import ActionButton from "../buttons/actionButton";
import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items"></div>
      <ActionButton>Go to Checkout</ActionButton>
    </div>
  );
};

export default CartDropdown;

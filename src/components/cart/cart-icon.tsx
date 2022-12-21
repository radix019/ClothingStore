import React from "react";
import "./cart-icon.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { ShoppingCart } from "../../contexts/ShoppingCart";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } =
    React.useContext(ShoppingCart);
  return (
    <div
      className="cart-icon-container"
      onClick={() => setIsCartOpen(!isCartOpen)}
    >
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;

import React from "react";
import "./cart-icon.scss";
import { ReactComponent as ShoppingIcon } from "../../../assets/icons/shopping-bag.svg";
import { ShoppingCart } from "../../../providers/ShoppingCart";

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

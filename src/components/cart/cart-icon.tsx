import React from "react";
import "./cart-icon.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { ShoppingCart } from "../../contexts/ShoppingCart";

const CartIcon = () => {
  const shopping = React.useContext(ShoppingCart);
  return (
    <div
      className="cart-icon-container"
      onClick={() => shopping.setIsCartOpen((state) => !state)}
    >
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{shopping.cartCount}</span>
    </div>
  );
};

export default CartIcon;

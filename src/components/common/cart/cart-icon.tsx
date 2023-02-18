import React from "react";
import "./cart-icon.scss";
import { ReactComponent as ShoppingIcon } from "../../../assets/icons/shopping-bag.svg";
import { useDispatch, useSelector } from "react-redux";
import { SHOPPING_CART_ACTION_TYPE } from "../../../_global/_Enum";
import { IRootState } from "../../../_redux/_Store";

const CartIcon = () => {
  const dispatch = useDispatch();
  const shoppingCart = useSelector((state: IRootState) => state.cart);

  const cartOpenHandle = (isCartOpen: boolean) => {
    dispatch({
      type: SHOPPING_CART_ACTION_TYPE.SET_IS_CART_OPEN,
      payload: isCartOpen,
    });
  };
  return (
    <div
      className="cart-icon-container"
      onClick={() => cartOpenHandle(!shoppingCart.isCartOpen)}
    >
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{shoppingCart.cartCount}</span>
    </div>
  );
};

export default CartIcon;

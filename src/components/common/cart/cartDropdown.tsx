import React from "react";
import { useNavigate } from "react-router-dom";
import "./cartDropdown.scss";
import CartItem from "./cart-item";
import ActionButton from "../../hoc/buttons/actionButton";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../_redux/_Store";
import { SHOPPING_CART_ACTION_TYPE } from "../../../_global/_Enum";

const CartDropdown = () => {
  const shoppingCart = useSelector((state: IRootState) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartOpenHandle = (isCartOpen: boolean) => {
    dispatch({
      type: SHOPPING_CART_ACTION_TYPE.SET_IS_CART_OPEN,
      payload: isCartOpen,
    });
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {shoppingCart.cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <ActionButton
        onClick={() => {
          cartOpenHandle(!shoppingCart.isCartOpen);
          navigate("/checkout");
        }}
      >
        Go to Checkout
      </ActionButton>
    </div>
  );
};

export default CartDropdown;

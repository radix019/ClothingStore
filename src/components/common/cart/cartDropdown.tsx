import React from "react";
import { useNavigate } from "react-router-dom";
import "./cartDropdown.scss";
import CartItem from "./cart-item";
import { ShoppingCart } from "../../../providers/ShoppingCart";
import ActionButton from "../../hoc/buttons/actionButton";

const CartDropdown = () => {
  const shopping = React.useContext(ShoppingCart);
  const navigate = useNavigate();
  const navigateToCheckout = () => {
    navigate("/checkout");
  };
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {shopping.cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <ActionButton
        onClick={() => {
          navigateToCheckout();
          shopping.setIsCartOpen(false);
        }}
      >
        Go to Checkout
      </ActionButton>
    </div>
  );
};

export default CartDropdown;

import React from "react";
import CheckoutItems from "../../components/cart/checkoutItems";
import { ShoppingCart } from "../../contexts/ShoppingCart";
import "./checkout.scss";

const Checkout = () => {
  const shopping = React.useContext(ShoppingCart);

  return (
    <div className="checkout-container">
      <div className="title_bar">
        <span className="total">Total ${shopping.cartTotal}</span>
      </div>
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>

      {shopping.cartItems.map((item) => (
        <CheckoutItems key={item.id} {...item} />
      ))}

      <span className="total">Total ${shopping.cartTotal}</span>
    </div>
  );
};

export default Checkout;

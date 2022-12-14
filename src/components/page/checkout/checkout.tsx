import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "../../../providers/ShoppingCart";
import { PAGE_TYPE } from "../../../_global/Route";
import CheckoutItems from "../../common/cart/checkoutItems";
import "./checkout.scss";

const Checkout = () => {
  const { cartItems, cartTotal, cartCount } = React.useContext(ShoppingCart);

  return (
    <div className="checkout-container">
      <div className="title_bar">
        {cartTotal ? <span className="total">Total ${cartTotal}</span> : ""}
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

      {cartCount ? (
        cartItems.map((item) => <CheckoutItems key={item.id} {...item} />)
      ) : (
        <h2>
          Your cart is empty.{" "}
          <Link to={`/${PAGE_TYPE.SHOP}`}> Continue shopping!</Link>
        </h2>
      )}
    </div>
  );
};

export default Checkout;

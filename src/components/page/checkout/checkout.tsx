import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PAGE_TYPE } from "../../../_global/Route";
import { IRootState } from "../../../_redux/_Store";
import CheckoutItems from "../../common/cart/checkoutItems";
import "./checkout.scss";

const Checkout = () => {
  const shoppingCart = useSelector((state: IRootState) => state.cart);
  // console.log(process.env);
  return (
    <div className="checkout-container">
      <div className="title_bar">
        {shoppingCart.cartTotal ? (
          <span className="total">Total ${shoppingCart.cartTotal}</span>
        ) : (
          ""
        )}
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

      {shoppingCart.cartCount ? (
        shoppingCart.cartItems.map((item) => (
          <CheckoutItems key={item.id} {...item} />
        ))
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

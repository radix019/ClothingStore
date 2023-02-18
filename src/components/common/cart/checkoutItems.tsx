import React from "react";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { SHOPPING_CART_ACTION_TYPE } from "../../../_global/_Enum";
import { IRootState } from "../../../_redux/_Store";
import "./checkoutItems.scss";

interface CheckoutItemsProps {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity?: number;
}
const CheckoutItems = (item: CheckoutItemsProps) => {
  const shoppingCart = useSelector((state: IRootState) => state.cart);
  const dispatch = useDispatch();

  const increaseItem = () => {
    const updatedCartItems = shoppingCart.cartItems.map(
      ({ id, name, imageUrl, price, quantity = 1 }) =>
        id === item.id
          ? { id, name, imageUrl, price, quantity: quantity + 1 }
          : { id, name, imageUrl, price, quantity }
    );
    dispatch({
      type: SHOPPING_CART_ACTION_TYPE.SET_ITEM_TO_CART,
      payload: updatedCartItems,
    });
  };

  const decreaseItem = () => {
    if (item.quantity === 1) {
      return deleteItem();
    }
    const targetProduct = shoppingCart.cartItems.find(
      (cartItem) => cartItem.id === item.id
    );

    if (targetProduct?.quantity === 1) {
      dispatch({
        type: SHOPPING_CART_ACTION_TYPE.SET_ITEM_TO_CART,
        payload: shoppingCart.cartItems.filter(
          (item) => item.id !== targetProduct.id
        ),
      });
    }
    const updatedCartItems = shoppingCart.cartItems.map(
      ({ id, name, imageUrl, price, quantity = 1 }) =>
        id === item.id
          ? { id, name, imageUrl, price, quantity: quantity - 1 }
          : { id, name, imageUrl, price, quantity }
    );
    dispatch({
      type: SHOPPING_CART_ACTION_TYPE.SET_ITEM_TO_CART,
      payload: updatedCartItems,
    });
  };
  const deleteItem = () => {
    dispatch({
      type: SHOPPING_CART_ACTION_TYPE.SET_ITEM_TO_CART,
      payload: shoppingCart.cartItems.filter(
        (cartItem) => cartItem.id !== item.id
      ),
    });
  };

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={item.imageUrl} alt={item.name} />
      </div>
      <span className="name">{item.name}</span>
      <span className="quantity">
        <div className="arrow" onClick={decreaseItem}>
          {<AiFillMinusCircle size={25} />}
        </div>
        {item.quantity}
        <div className="arrow" onClick={increaseItem}>
          {<AiFillPlusCircle size={25} />}
        </div>
      </span>
      <span className="price"> ${item.price}</span>
      <span className="remove-button" onClick={deleteItem}>
        {<GrClose />}
      </span>
    </div>
  );
};
export default CheckoutItems;

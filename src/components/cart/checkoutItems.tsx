import React from "react";
import { ShoppingCart } from "../../contexts/ShoppingCart";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import "./checkoutItems.scss";

interface CheckoutItemsProps {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity?: number;
}
const CheckoutItems = (item: CheckoutItemsProps) => {
  const shopping = React.useContext(ShoppingCart);
  const increaseItem = () => {
    shopping.addToCart(item);
  };
  const decreaseItem = () => {
    if (item.quantity === 1) {
      return shopping.deleteItemFromCart(item);
    }
    shopping.removeFromCart(item);
  };
  const deleteItem = () => {
    shopping.deleteItemFromCart(item);
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

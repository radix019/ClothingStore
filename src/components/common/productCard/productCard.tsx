import { useDispatch, useSelector } from "react-redux";
import { SHOPPING_CART_ACTION_TYPE } from "../../../_global/_Enum";
import { IRootState } from "../../../_redux/_Store";
import ActionButton from "../../hoc/buttons/actionButton";
import "./product-card.styles.scss";

export interface ProductCardProps {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

const ProductCard = (props: ProductCardProps) => {
  const shoppingCart = useSelector((state: IRootState) => state.cart);
  const dispatch = useDispatch();

  const addToCart = () => {
    let updatedCartItems;
    if (shoppingCart.cartItems.find((cartItem) => cartItem.id === props.id)) {
      updatedCartItems = shoppingCart.cartItems.map(
        ({ id, name, imageUrl, price, quantity = 1 }) =>
          id === props.id
            ? { id, name, imageUrl, price, quantity: quantity + 1 }
            : { id, name, imageUrl, price, quantity }
      );
    } else {
      updatedCartItems = [...shoppingCart.cartItems, { ...props, quantity: 1 }];
    }
    console.log("updatedCartItems", updatedCartItems);
    dispatch({
      type: SHOPPING_CART_ACTION_TYPE.SET_ITEM_TO_CART,
      payload: [...updatedCartItems],
    });
  };

  return (
    <div className="product-card-container">
      <img className="img" src={props.imageUrl} alt={props.name} />
      <div className="footer">
        <span className="name">{props.name}</span>
        <span className="price">${props.price}</span>
      </div>
      <ActionButton onClick={addToCart} ClassType="inverted">
        Add to Cart
      </ActionButton>
    </div>
  );
};

export default ProductCard;

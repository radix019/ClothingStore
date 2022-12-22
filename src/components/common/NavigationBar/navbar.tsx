import React from "react";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as Logo } from "../../../assets/icons/crown.svg";
import "./navbar.scss";
import { getAuth, signOut } from "firebase/auth";
import { UserAuthContext } from "../../../providers/Auth";
import { ShoppingCart } from "../../../providers/ShoppingCart";
import CartIcon from "../cart/cart-icon";
import CartDropdown from "../cart/cartDropdown";

const Navbar = () => {
  const auth = getAuth();
  const { loggedInUser } = React.useContext(UserAuthContext);
  const logoutHandle = async () => {
    await signOut(auth);
  };
  const { isCartOpen } = React.useContext(ShoppingCart);
  return (
    <>
      <div className="navigation">
        <Link to="/" className="logo-contianer">
          <Logo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link to="/shop" className="nav-link">
            Shop
          </Link>
          {loggedInUser ? (
            <span onClick={logoutHandle} className="nav-link">
              Sign Out
            </span>
          ) : (
            <Link to="/auth" className="nav-link">
              Sing In
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;

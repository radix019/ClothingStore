import React from "react";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as Logo } from "../../../assets/icons/crown.svg";
import "./navbar.scss";
import { getAuth, signOut } from "firebase/auth";
import { ShoppingCart } from "../../../providers/ShoppingCart";
import CartIcon from "../cart/cart-icon";
import CartDropdown from "../cart/cartDropdown";
import { LOG_IN, LOG_OUT, SHOP } from "../../../_global/Constants";
import { IRootState } from "../../../_redux/_Store";
import { useSelector } from "react-redux";

const Navbar = () => {
  const auth = getAuth();
  const apiLoggedInUser = useSelector(
    (state: IRootState) => state.userAuth.loggedInUser
  );
  const [loggedInUser, setLoggedInUser] = React.useState(apiLoggedInUser);

  React.useEffect(() => {
    setLoggedInUser(apiLoggedInUser);
  }, [apiLoggedInUser]);
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
            {SHOP}
          </Link>
          {loggedInUser ? (
            <span onClick={logoutHandle} className="nav-link">
              {LOG_OUT}
            </span>
          ) : (
            <Link to="/auth" className="nav-link">
              {LOG_IN}
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

import { Route, Routes } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
  createUserDocument,
  firebaseConfig,
  onAuthStateChangedLister,
} from "./_api/firebaseConfig";
import { CATEGORY_PARAM_TYPE, PAGE_TYPE } from "./_global/Route";
import Navbar from "./components/common/NavigationBar/navbar";
import Home from "./components/page/home/HomePage";
import Auth from "./components/page/auth/Auth";
import Signup from "./components/page/auth/signup/signup";
import Checkout from "./components/page/checkout/checkout";
import Category from "./components/products/AllProductsList";
import FeaturedProducts from "./components/products/FeaturedProducts";
import React from "react";
import { USER_ACTION_TYPE } from "./_global/_Enum";
import { useDispatch } from "react-redux";

initializeApp(firebaseConfig);
export default function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChangedLister((user) => {
      if (user) {
        createUserDocument(user);
      }
      dispatch({
        type: USER_ACTION_TYPE.SET_LOGGEDIN_USER,
        payload: user,
      });
    });
    return unsubscribe;
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path={`${PAGE_TYPE.SHOP}`}>
          <Route index element={<FeaturedProducts />} />
          <Route
            path={`:${CATEGORY_PARAM_TYPE.CATEGORY}`}
            element={<Category />}
          />
        </Route>
        <Route path={PAGE_TYPE.AUTH} element={<Auth />} />
        <Route path={PAGE_TYPE.SIGN_UP} element={<Signup />} />
        <Route path={PAGE_TYPE.CHECKOUT} element={<Checkout />} />
      </Route>
    </Routes>
  );
}

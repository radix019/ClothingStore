import { Route, Routes } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./_api/firebaseConfig";
import { CATEGORY_PARAM_TYPE, PAGE_TYPE } from "./_global/Route";
import Navbar from "./components/common/NavigationBar/navbar";
import Home from "./components/page/home/HomePage";
import Auth from "./components/page/auth/Auth";
import Signup from "./components/page/signup/signup";
import Checkout from "./components/page/checkout/checkout";
import Category from "./components/products/AllProductsList";
import FeaturedProducts from "./components/products/FeaturedProducts";

initializeApp(firebaseConfig);
export default function App() {
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

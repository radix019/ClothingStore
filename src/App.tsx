import { Route, Routes } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./_api/firebaseConfig";
import { CATEGORY_PARAM_TYPE, LAYOUT_TYPE } from "./_global/Route";
import Navbar from "./components/common/NavigationBar/navbar";
import Home from "./components/page/home/HomePage";
import Auth from "./components/page/auth/Auth";
import Signup from "./components/page/signup/signup";
import Checkout from "./components/page/checkout/checkout";
import CategoriesPreview from "./components/categories-preview/categories-preview";
import Category from "./components/category/AllProducts";

initializeApp(firebaseConfig);
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path={`${LAYOUT_TYPE.SHOP}`}>
          <Route index element={<CategoriesPreview />} />
          <Route
            path={`:${CATEGORY_PARAM_TYPE.CATEGORY}`}
            element={<Category />}
          />
        </Route>
        <Route path={LAYOUT_TYPE.AUTH} element={<Auth />} />
        <Route path={LAYOUT_TYPE.SIGN_UP} element={<Signup />} />
        <Route path={LAYOUT_TYPE.CHECKOUT} element={<Checkout />} />
      </Route>
    </Routes>
  );
}

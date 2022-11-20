import { Route, Routes } from "react-router-dom";
import Navbar from "./components/NavigationBar/navbar";
import Home from "./routes/Home";
import Authentication from "./routes/authentication/authentication";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./utils/firebase/firebaseConfig";
import Signup from "./components/signup/signup";
import Checkout from "./routes/checkout/checkout";
import Shop from "./components/shop/shop";

initializeApp(firebaseConfig);
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="signup" element={<Signup />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;

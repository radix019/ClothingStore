import { Route, Routes } from "react-router-dom";
import Navbar from "./components/NavigationBar/navbar";
import Home from "./routes/Home";
import Authentication from "./routes/authentication/authentication";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./utils/firebase/firebaseConfig";
import Signup from "./components/signup/signup";
import Shopping from "./components/shop/shopping";

initializeApp(firebaseConfig);
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shopping />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="signup" element={<Signup />} />
      </Route>
    </Routes>
  );
};

export default App;

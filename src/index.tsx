import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { UserAuthProvider } from "./providers/Auth";
import { ProductContextProvider } from "./providers/Data";
import { ShoppingCartProvider } from "./providers/ShoppingCart";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserAuthProvider>
        <ProductContextProvider>
          <ShoppingCartProvider>
            <App />
          </ShoppingCartProvider>
        </ProductContextProvider>
      </UserAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// <ProductContextProvider>{/*CategoriesProvider */}
reportWebVitals();

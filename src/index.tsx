import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { UserAuthProvider } from "./contexts/user-auth";
import { ProductContextProvider } from "./contexts/dataContext";
import { ShoppingCartProvider } from "./contexts/ShoppingCart";

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

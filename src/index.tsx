import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ProductContextProvider } from "./providers/Data";
import { ShoppingCartProvider } from "./providers/ShoppingCart";
import { Provider } from "react-redux";
import store from "./_redux/_Store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ProductContextProvider>
          <ShoppingCartProvider>
            <App />
          </ShoppingCartProvider>
        </ProductContextProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// <ProductContextProvider>{/*CategoriesProvider */}
reportWebVitals();

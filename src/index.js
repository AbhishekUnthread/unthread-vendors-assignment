import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

import App from "./App";
import ScrollToTop from "./ScrollToTop";

import store from "./app/store";

import "./index.scss";

if (process.env.REACT_APP_ENV !== "dev") {
  disableReactDevTools();
}

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </Provider>
);

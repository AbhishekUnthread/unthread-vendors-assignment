import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.scss";
import ScrollToTop from "./ScrollToTop";
// import { Provider } from "react-redux";
// import { store, persistor } from "./redux/store";
// import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ScrollToTop />
    {/* <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> */}
        <App />
      {/* </PersistGate>
    </Provider> */}
  </BrowserRouter>
);

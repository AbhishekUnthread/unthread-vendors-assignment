import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";

import "./App.scss";

import router from "./routes";

const App = () => {
  return (
    <>
      <CssBaseline />
      <RouterProvider router={router()} />
    </>
  );
};

export default App;

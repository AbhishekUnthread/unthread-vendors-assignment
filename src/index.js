import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

import App from "./App";
import {
  SuccessMessage,
  ErrorMessage,
  WarningMessage,
  InfoMessage,
} from "./components/Snackbar/Snackbar";
import { SnackbarUtilsConfigurator } from "./features/snackbar/useSnackbar";

import store from "./app/store";

import "./index.scss";

if (process.env.REACT_APP_ENV !== "dev") {
  disableReactDevTools();
}

const SNACKBAR_DURATION = 5000;

const projectTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#FFF",
    },
    purple: {
      main: "#8f5fe8",
    },
  },
  typography: {
    allVariants: {
      fontFamily: "Inter",
    },
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#433e73",
          color: "",
          border: "1px solid #433e73",
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          backgroundColor: "#181732",
          "&:hover": {
            backgroundColor: "#181732",
          },
        },
      },
    },
  },
});

createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={projectTheme}>
      <SnackbarProvider
        autoHideDuration={SNACKBAR_DURATION}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        Components={{
          success: SuccessMessage,
          error: ErrorMessage,
          warning: WarningMessage,
          info: InfoMessage,
        }}
        maxSnack={3}
      >
        <SnackbarUtilsConfigurator />
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  </Provider>
  // </React.StrictMode>
);

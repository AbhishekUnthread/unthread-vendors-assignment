import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";

import Messages from "./components/snackbar/snackbar";

import "./App.scss";

import router from "./routes";

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
  },
});

const App = () => {
  return (
    <ThemeProvider theme={projectTheme}>
      <CssBaseline />
      <RouterProvider router={router()} />
      <Messages />
    </ThemeProvider>
  );
};

export default App;

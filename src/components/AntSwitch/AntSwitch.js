import { styled, Switch } from "@mui/material";

export const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 42,
  height: 20,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 18,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(1px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    top: "0.4px",
    "&.Mui-checked": {
      transform: "translateX(18px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        // backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
        backgroundColor: "#8f5fe8",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 15,
    height: 15,
    borderRadius: 12,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
    marginLeft: "2px",
  },
  "& .MuiSwitch-track": {
    borderRadius: 24 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

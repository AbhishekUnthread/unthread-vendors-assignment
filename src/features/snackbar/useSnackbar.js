import { useSnackbar } from "notistack";

const SNACKBAR_DURATION = 5000;

let useSnackbarRef;
export const SnackbarUtilsConfigurator = () => {
  useSnackbarRef = useSnackbar();
  return null;
};

export default {
  success(msg) {
    this.toast(msg, "success");
  },
  warning(msg) {
    this.toast(msg, "warning");
  },
  info(msg) {
    this.toast(msg, "info");
  },
  error(msg) {
    this.toast(msg, "error");
  },
  toast(msg, variant = "default") {
    useSnackbarRef.enqueueSnackbar(msg, {
      variant,
      autoHideDuration: SNACKBAR_DURATION,
    });
  },
};

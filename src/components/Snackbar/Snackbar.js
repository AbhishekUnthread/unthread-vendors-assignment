import { forwardRef, useCallback } from "react";
import { useSnackbar, SnackbarContent } from "notistack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import HelpIcon from "@mui/icons-material/Help";

const SuccessMessage = forwardRef(({ id, ...props }, ref) => {
  const { closeSnackbar } = useSnackbar();

  const handleDismiss = useCallback(() => {
    closeSnackbar(id);
  }, [id, closeSnackbar]);

  return (
    <SnackbarContent ref={ref}>
      <Card className="snackbar success">
        <div className="container">
          <CheckCircleOutlineIcon fontSize="small" sx={{ color: "#a6faaf" }} />
          <Typography variant="body2">{props.message}</Typography>
          <IconButton size="small" onClick={handleDismiss}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
      </Card>
    </SnackbarContent>
  );
});
const ErrorMessage = forwardRef(({ id, ...props }, ref) => {
  const { closeSnackbar } = useSnackbar();

  const handleDismiss = useCallback(() => {
    closeSnackbar(id);
  }, [id, closeSnackbar]);

  return (
    <SnackbarContent ref={ref}>
      <Card className="snackbar error">
        <div className="container">
          <ErrorOutlineIcon fontSize="small" sx={{ color: "#f67476" }} />
          <Typography variant="body2">{props.message}</Typography>
          <IconButton size="small" onClick={handleDismiss}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
      </Card>
    </SnackbarContent>
  );
});
const WarningMessage = forwardRef(({ id, ...props }, ref) => {
  const { closeSnackbar } = useSnackbar();

  const handleDismiss = useCallback(() => {
    closeSnackbar(id);
  }, [id, closeSnackbar]);

  return (
    <SnackbarContent ref={ref}>
      <Card className="snackbar warning">
        <div className="container">
          <WarningAmberIcon fontSize="small" sx={{ color: "#ffc75b" }} />
          <Typography variant="body2">{props.message}</Typography>
          <IconButton size="small" onClick={handleDismiss}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
      </Card>
    </SnackbarContent>
  );
});
const InfoMessage = forwardRef(({ id, ...props }, ref) => {
  const { closeSnackbar } = useSnackbar();

  const handleDismiss = useCallback(() => {
    closeSnackbar(id);
  }, [id, closeSnackbar]);

  return (
    <SnackbarContent ref={ref}>
      <Card className="snackbar info">
        <div className="container">
          <HelpIcon fontSize="small" sx={{ color: "#c8d8ff" }} />
          <Typography variant="body2">{props.message}</Typography>
          <IconButton size="small" onClick={handleDismiss}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
      </Card>
    </SnackbarContent>
  );
});

export { SuccessMessage, ErrorMessage, WarningMessage, InfoMessage };

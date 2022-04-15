import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";

const SlideTransition = (props) => <Slide {...props} direction="right" />;

const StandardSnackbar = ({ variant, severity, message, open, handleClose }) => (
    <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        TransitionComponent={SlideTransition}
    >
        <Alert severity={severity} variant={variant} onClose={handleClose}>
            {message}
        </Alert>
    </Snackbar>
);

export default StandardSnackbar;

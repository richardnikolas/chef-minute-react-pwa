import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.darkGray,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh"
    },
    splashImg: {
        width: "80vw"
    }
}));

const SplashPage = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("storedUser");

        if (storedUser) {
            navigate("/home");
        } else {
            setTimeout(() => {
                navigate("/sign-up");
            }, [1000]);
        }
    }, []);

    return (
        <div className={classes.root}>
            <img
                className={classes.splashImg}
                src={process.env.PUBLIC_URL + "/assets/logo-splash.png"}
                alt="Logo Splash"
            />
        </div>
    );
};

export default SplashPage;

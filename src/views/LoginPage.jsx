import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontFamily: "Quicksand",
        fontWeight: 700,
        fontSize: "1.5rem",
        marginTop: 10
    },
    logoCircle: {
        width: "30vw"
    }
}));

const LoginPage = () => {
    const classes = useStyles();

    return (
        <Grid container direction="column" className={classes.root}>
            <Grid item xs={2}>
                <img
                    src={`${process.env.PUBLIC_URL}/assets/logo-circle.png`}
                    className={classes.logoCircle}
                    alt="Logo circle"
                />
                <h6 className={classes.title}>Welcome!</h6>
            </Grid>
        </Grid>
    );
};

export default LoginPage;

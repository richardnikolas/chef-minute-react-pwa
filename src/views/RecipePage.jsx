import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh"
    },
    title: {
        fontFamily: "Quicksand",
        fontWeight: 700,
        fontSize: "1.3rem",
        marginTop: 10
    },
    logoCircle: {
        width: "30vw"
    }
}));

const RecipePage = () => {
    const classes = useStyles();

    return <></>;
};

export default RecipePage;
